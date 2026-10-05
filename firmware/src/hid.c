/* SPDX-License-Identifier: Apache-2.0 */
#include <errno.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/bluetooth/uuid.h>
#include <zephyr/sys/atomic.h>
#include "hid.h"

/* Consumer Control, report ID 1, one Volume Increment bit and seven padding
 * bits. A report characteristic carries only the payload, not the report ID. */
static const uint8_t report_map[] = {
	0x05,0x0c, 0x09,0x01, 0xa1,0x01, 0x85,0x01,
	0x15,0x00, 0x25,0x01, 0x09,0xe9, 0x75,0x01,
	0x95,0x01, 0x81,0x02, 0x75,0x07, 0x95,0x01,
	0x81,0x03, 0xc0
};
/* No remote wake promise; advertising stops after the connection window. */
static const uint8_t information[] = {0x11,0x01,0x00,0x00};
static const uint8_t report_reference[] = {0x01,0x01};
static atomic_t subscribed;
static atomic_t suspended;
static uint8_t last_report;

static ssize_t read_map(struct bt_conn *conn, const struct bt_gatt_attr *attr,
		void *buf, uint16_t len, uint16_t offset)
{
	return bt_gatt_attr_read(conn, attr, buf, len, offset, report_map, sizeof(report_map));
}
static ssize_t read_info(struct bt_conn *conn, const struct bt_gatt_attr *attr,
		void *buf, uint16_t len, uint16_t offset)
{
	return bt_gatt_attr_read(conn, attr, buf, len, offset, information, sizeof(information));
}
static ssize_t read_reference(struct bt_conn *conn, const struct bt_gatt_attr *attr,
		void *buf, uint16_t len, uint16_t offset)
{
	return bt_gatt_attr_read(conn, attr, buf, len, offset, report_reference, sizeof(report_reference));
}
static ssize_t read_input(struct bt_conn *conn, const struct bt_gatt_attr *attr,
		void *buf, uint16_t len, uint16_t offset)
{
	return bt_gatt_attr_read(conn, attr, buf, len, offset, &last_report, sizeof(last_report));
}
static void ccc_changed(const struct bt_gatt_attr *attr, uint16_t value)
{
	ARG_UNUSED(attr);
	atomic_set(&subscribed, value == BT_GATT_CCC_NOTIFY);
}
static ssize_t write_control(struct bt_conn *conn, const struct bt_gatt_attr *attr,
		const void *buf, uint16_t len, uint16_t offset, uint8_t flags)
{
	ARG_UNUSED(conn); ARG_UNUSED(attr); ARG_UNUSED(flags);
	if (offset != 0) return BT_GATT_ERR(BT_ATT_ERR_INVALID_OFFSET);
	if (len != 1) return BT_GATT_ERR(BT_ATT_ERR_INVALID_ATTRIBUTE_LEN);
	uint8_t command = *(const uint8_t *)buf;
	if (command > 1) return BT_GATT_ERR(BT_ATT_ERR_VALUE_NOT_ALLOWED);
	atomic_set(&suspended, command == 0);
	return len;
}

BT_GATT_SERVICE_DEFINE(shutter_hid,
	BT_GATT_PRIMARY_SERVICE(BT_UUID_HIDS),
	BT_GATT_CHARACTERISTIC(BT_UUID_HIDS_INFO, BT_GATT_CHRC_READ,
		BT_GATT_PERM_READ, read_info, NULL, NULL),
	BT_GATT_CHARACTERISTIC(BT_UUID_HIDS_REPORT_MAP, BT_GATT_CHRC_READ,
		BT_GATT_PERM_READ, read_map, NULL, NULL),
	BT_GATT_CHARACTERISTIC(BT_UUID_HIDS_REPORT, BT_GATT_CHRC_READ | BT_GATT_CHRC_NOTIFY,
		BT_GATT_PERM_READ_ENCRYPT, read_input, NULL, NULL),
	BT_GATT_CCC(ccc_changed, BT_GATT_PERM_READ_ENCRYPT | BT_GATT_PERM_WRITE_ENCRYPT),
	BT_GATT_DESCRIPTOR(BT_UUID_HIDS_REPORT_REF, BT_GATT_PERM_READ,
		read_reference, NULL, NULL),
	BT_GATT_CHARACTERISTIC(BT_UUID_HIDS_CTRL_POINT, BT_GATT_CHRC_WRITE_WITHOUT_RESP,
		BT_GATT_PERM_WRITE_ENCRYPT, NULL, write_control, NULL)
);

bool shutter_hid_ready(void)
{
	return atomic_get(&subscribed) && !atomic_get(&suspended);
}
int shutter_hid_send(bool pressed)
{
	if (!shutter_hid_ready()) return -EACCES;
	uint8_t report = pressed ? 1 : 0;
	int err = bt_gatt_notify(NULL, &shutter_hid.attrs[5], &report, sizeof(report));
	if (!err) last_report = report;
	return err;
}
void shutter_hid_disconnected(void)
{
	atomic_clear(&subscribed);
	atomic_clear(&suspended);
	last_report = 0;
}
