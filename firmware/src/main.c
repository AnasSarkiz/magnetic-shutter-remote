/* SPDX-License-Identifier: Apache-2.0 */
#include <errno.h>
#include <zephyr/kernel.h>
#include <zephyr/drivers/gpio.h>
#include <zephyr/settings/settings.h>
#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/conn.h>
#include <zephyr/bluetooth/hci.h>
#include <zephyr/bluetooth/uuid.h>
#include <zephyr/sys/atomic.h>
#include "hid.h"

static const struct gpio_dt_spec shutter = GPIO_DT_SPEC_GET(DT_ALIAS(sw0), gpios);
static const struct gpio_dt_spec pair = GPIO_DT_SPEC_GET(DT_ALIAS(sw1), gpios);
static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios);
static struct gpio_callback button_callback;
K_SEM_DEFINE(button_event, 0, 1);
static atomic_t connected;
static atomic_t restart_advertising;
static bool advertising;
static bool pairing_window;
static bool bond_present;
static int bond_error;
static int64_t advertising_deadline;

static const struct bt_data advertising_payload[] = {
	BT_DATA_BYTES(BT_DATA_FLAGS, BT_LE_AD_GENERAL | BT_LE_AD_NO_BREDR),
	BT_DATA_BYTES(BT_DATA_UUID16_ALL, BT_UUID_16_ENCODE(BT_UUID_HIDS_VAL)),
	BT_DATA_BYTES(BT_DATA_GAP_APPEARANCE, 0x80, 0x01)
};
static const struct bt_data scan_payload[] = {
	BT_DATA(BT_DATA_NAME_COMPLETE, CONFIG_BT_DEVICE_NAME, sizeof(CONFIG_BT_DEVICE_NAME) - 1)
};

static void fault(void)
{
	for (;;) {
		gpio_pin_toggle_dt(&led);
		k_sleep(K_MSEC(100));
	}
}
static void button_irq(const struct device *port, struct gpio_callback *cb, uint32_t pins)
{
	ARG_UNUSED(port); ARG_UNUSED(cb); ARG_UNUSED(pins);
	k_sem_give(&button_event);
}
static void on_connected(struct bt_conn *conn, uint8_t err)
{
	if (err) { atomic_set(&restart_advertising, 1); return; }
	atomic_set(&connected, 1);
	if (bt_conn_set_security(conn, BT_SECURITY_L2)) {
		bt_conn_disconnect(conn, BT_HCI_ERR_AUTH_FAIL);
	}
}
static void on_disconnected(struct bt_conn *conn, uint8_t reason)
{
	ARG_UNUSED(conn); ARG_UNUSED(reason);
	atomic_clear(&connected);
	shutter_hid_disconnected();
	atomic_set(&restart_advertising, 1);
	k_sem_give(&button_event);
}
BT_CONN_CB_DEFINE(connection_callbacks) = {
	.connected = on_connected,
	.disconnected = on_disconnected,
};
static void add_bond(const struct bt_bond_info *bond, void *context)
{
	ARG_UNUSED(context);
	bond_present = true;
	int err = bt_le_filter_accept_list_add(&bond->addr);
	if (err) bond_error = err;
}
static int start_advertising(bool request_pairing)
{
	if (advertising) {
		int err = bt_le_adv_stop();
		if (err && err != -EALREADY) return err;
	}
	advertising = false;
	bond_present = false;
	bond_error = 0;
	int err = bt_le_filter_accept_list_clear();
	if (err) return err;
	bt_foreach_bond(BT_ID_DEFAULT, add_bond, NULL);
	if (bond_error) return bond_error;
	pairing_window = request_pairing || !bond_present;
	bt_set_bondable(pairing_window);
	struct bt_le_adv_param parameters = *BT_LE_ADV_CONN_FAST_1;
	if (!pairing_window) parameters.options |= BT_LE_ADV_OPT_FILTER_CONN;
	err = bt_le_adv_start(&parameters, advertising_payload, ARRAY_SIZE(advertising_payload),
		scan_payload, ARRAY_SIZE(scan_payload));
	if (!err) {
		advertising = true;
		advertising_deadline = k_uptime_get() + (pairing_window ? 120000 : 30000);
	}
	return err;
}
static void disconnect_peer(struct bt_conn *conn, void *context)
{
	ARG_UNUSED(context);
	bt_conn_disconnect(conn, BT_HCI_ERR_REMOTE_USER_TERM_CONN);
}

int main(void)
{
	if (!gpio_is_ready_dt(&led) || !gpio_is_ready_dt(&shutter) || !gpio_is_ready_dt(&pair)) return -ENODEV;
	if (gpio_pin_configure_dt(&led, GPIO_OUTPUT_INACTIVE)) return -EIO;
	if (gpio_pin_configure_dt(&shutter, GPIO_INPUT) || gpio_pin_configure_dt(&pair, GPIO_INPUT)) fault();
	gpio_init_callback(&button_callback, button_irq, BIT(shutter.pin) | BIT(pair.pin));
	if (gpio_add_callback(shutter.port, &button_callback) ||
		gpio_pin_interrupt_configure_dt(&shutter, GPIO_INT_EDGE_BOTH) ||
		gpio_pin_interrupt_configure_dt(&pair, GPIO_INT_EDGE_BOTH)) fault();
	if (bt_enable(NULL) || settings_load() || start_advertising(false)) fault();

	bool shutter_was_pressed = false;
	bool pair_was_pressed = false;
	bool pair_hold_handled = false;
	bool release_pending = false;
	bool pairing_requested = false;
	int64_t pair_pressed_at = 0;
	int64_t release_at = 0;
	int64_t led_off_at = 0;
	int64_t last_blink = 0;
	int64_t last_input_change = 0;
	int previous_raw = 0;

	for (;;) {
		int64_t now = k_uptime_get();
		if (atomic_cas(&restart_advertising, 1, 0)) {
			advertising = false;
			release_pending = false;
			if (pairing_requested && bt_unpair(BT_ID_DEFAULT, BT_ADDR_LE_ANY)) fault();
			if (start_advertising(pairing_requested)) fault();
			pairing_requested = false;
		}
		int shutter_raw = gpio_pin_get_dt(&shutter);
		int pair_raw = gpio_pin_get_dt(&pair);
		if (shutter_raw < 0 || pair_raw < 0) fault();
		int raw = shutter_raw | (pair_raw << 1);
		if (raw != previous_raw) { previous_raw = raw; last_input_change = now; }
		if (now - last_input_change >= 30) {
			bool shutter_pressed = raw & 1;
			bool pair_pressed = raw & 2;
			if (shutter_pressed && !shutter_was_pressed) {
				if (atomic_get(&connected) && !release_pending && shutter_hid_send(true) == 0) {
					release_pending = true;
					release_at = now + 60;
					gpio_pin_set_dt(&led, 1);
					led_off_at = now + 80;
				} else if (!atomic_get(&connected) && !advertising) {
					if (start_advertising(false)) fault();
				}
			}
			if (pair_pressed && !pair_was_pressed) { pair_pressed_at = now; pair_hold_handled = false; }
			if (pair_pressed && !pair_hold_handled && now - pair_pressed_at >= 3000) {
				pair_hold_handled = true;
				if (atomic_get(&connected)) {
					pairing_requested = true;
					bt_conn_foreach(BT_CONN_TYPE_LE, disconnect_peer, NULL);
				} else {
					if (advertising && bt_le_adv_stop()) fault();
					advertising = false;
					if (bt_unpair(BT_ID_DEFAULT, BT_ADDR_LE_ANY) || start_advertising(true)) fault();
				}
			}
			shutter_was_pressed = shutter_pressed;
			pair_was_pressed = pair_pressed;
		}
		if (release_pending && now >= release_at) {
			if (shutter_hid_send(false) == 0) release_pending = false;
			else if (now - release_at > 1000) {
				/* End a stalled link instead of leaving a pressed key latched. */
				bt_conn_foreach(BT_CONN_TYPE_LE, disconnect_peer, NULL);
				release_pending = false;
			}
		}
		if (advertising && !atomic_get(&connected) && now >= advertising_deadline) {
			if (bt_le_adv_stop()) fault();
			advertising = false;
			bt_set_bondable(false);
		}
		if (advertising && !atomic_get(&connected) && now - last_blink >= (pairing_window ? 500 : 2000)) {
			gpio_pin_set_dt(&led, 1); led_off_at = now + 30; last_blink = now;
		}
		if (now >= led_off_at) gpio_pin_set_dt(&led, 0);
		/* Interrupt wakes idle immediately. Poll briefly for debounce, pairing
		 * hold and release retry; otherwise sleep between status updates. */
		bool busy = raw || release_pending || now - last_input_change < 40 || now < led_off_at;
		k_sem_take(&button_event, busy ? K_MSEC(10) : K_MSEC(500));
	}
}
