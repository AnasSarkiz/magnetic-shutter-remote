#ifndef GRIP_SHUTTER_HID_H
#define GRIP_SHUTTER_HID_H
#include <stdbool.h>
bool shutter_hid_ready(void);
int shutter_hid_send(bool pressed);
void shutter_hid_disconnected(void);
#endif
