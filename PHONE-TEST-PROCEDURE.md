# Prototype acceptance procedure

**No physical tests have been performed.** Proposed targets are native Apple Camera on an iPhone and Samsung Camera on a representative Galaxy Android phone. Record the actual hardware, OS build and app version used; do not infer a pass for other versions/apps.

Apple's [Camera guide](https://support.apple.com/guide/iphone/camera-basics-iph263472f78/ios) documents taking a photo with either volume button. Samsung's [camera settings guide](https://www.samsung.com/us/support/answer/ANS10001353/) documents configurable volume-button actions. This supports the intended volume-increment HID approach; **it does not prove that these apps will accept this BLE implementation**. Samsung must be set to “Take pictures or record videos”, rather than zoom or system volume. Exact menu names can vary. Third-party apps are outside the initial acceptance claim.

## Bench before pairing

After all electrical, sourcing and fabrication gates pass, record board ID, assembly inspection, source manifest, firmware hash, probe and instruments. With cell disconnected, verify connector polarity, shorts, resistor values and charging interlock. Use a current-limited supply/battery simulator to characterize V3 across the intended pack range before attaching the pack. Verify SWD readback and reset. Test both USB-C orientations using C-to-C and A-to-C sources; measure charge current, charge voltage/taper/termination, fault handling and case/cell temperatures. Confirm the radio shuts down on USB insertion and restarts only as intended. Test protection using a suitable controlled fixture, not a deliberate uncontrolled cell short. Verify pack protection thresholds and no reverse/backfeed current. Qualify charge-temperature enforcement before release.

## Phone matrix

Create one result record for each phone/OS/app combination, including Camera settings, accessory name, BT security/bond state, distance, grip/case/phone orientation, cell voltage and date. Use the same verified firmware build for each comparison.

1. Factory-clear the accessory bond. Confirm “Grip Shutter R1” appears, pairs through the normal Bluetooth UI and creates an encrypted bonded connection. Capture service discovery and the report map/CCC state with a BLE diagnostic tool where available. Check the report is Consumer Control 0xE9, ID 1, payload 01 then 00; no ID byte in the GATT payload.
2. Open native Camera in Photo mode. Take 100 individual pictures, 1 s apart. Require 100 intended captures, zero duplicates and zero missed presses under this defined test. Record event-to-shutter latency; provisional target median <200 ms, p95 <500 ms (camera processing may need separate timing).
3. Hold SHUTTER 5 s. Confirm one short event, no stuck volume, sustained burst or accidental long video due to an unreleased HID key. Test rapid tapping separately; document the maximum reliable rate instead of claiming unlimited throughput.
4. Repeat front/rear cameras, portrait/landscape and both “volume up for burst” states on iPhone when available. Test video start/stop separately and report actual behavior; photo compatibility is not video compatibility.
5. Close Camera and test the same key once. It may change system volume; this is expected Consumer Control behavior. Reopen Camera and confirm recovery. Locked screen, background app and screen-off behavior must be recorded; automatic Camera launch or remote wake is not promised.
6. Power-cycle the remote and phone Bluetooth. Verify the single saved bond reconnects. Let the 30 s reconnect window expire: first SHUTTER tap should restart advertising without taking an unexpected photo; next deliberate tap after connection should capture. Unbonded pairing expires after 120 s. Test a second phone cannot replace the bond without the intentional long PAIR hold.
7. Hold PAIR ≥3 s; verify prior peer disconnects, bond is erased, new pairing window opens and a different phone can pair. Verify short accidental presses do not erase bonds. Remove the stale accessory bond from the former phone if its OS requires it.
8. Interrupt the link immediately after a press, unsubscribe notifications, simulate a busy notification queue in a test build and reconnect. Require no latched key and no queued surprise capture. Collect logs through a temporary SWD/debug build; preserve production build hashes separately.
9. Repeat detached at 1 m, 5 m and 10 m line of sight, then docked with battery, magnets, chosen phone case and all hardware. These are test distances, not promised range. Measure RSSI/packet loss and capture reliability across orientations. Compare docked/detached to catch detuning.
10. Measure average/peak battery current for connected idle, advertising, timed-out idle, held button, shutter, SW1 off and charging. Run a full discharge/charge cycle inside the accepted temperature range. Compare with REQUIREMENTS.md's assumptions and update the runtime estimate with measured usable capacity.

## Mechanical and release acceptance

Verify worst-case component heights, mating cables, actuator preload/travel/stops, cell cavity and wire abrasion, screw penetration, antenna spacing, magnetic retention and drop/handling behavior. Use sacrificial mechanical samples for drop tests before exposing a cell. Inspect cell swelling space after cycling. The grip must retain the phone and removable remote without compressing the pouch or placing metal within the qualified RF region.

A pass record must contain observed results and evidence, not just checked boxes. File unresolved app behavior by exact phone/OS/app; narrow compatibility claims accordingly. Physical prototype readiness and successful fabrication exports do not themselves pass these tests.

## R2 battery, enclosure and RF additions

Use DTP401525(PHR) specification v2 and record delivered pack marking, measured dimensions and harness polarity before installation. Verify 18.812–21.212 mA charge-current design range, maximum 4.1205 V regulation target, charge taper/termination, safety timer and temperature-interruption recovery. Test the automatic inhibition circuit through cold/hot ramps and power-up; prove the sensor-to-cell error is <2°C on the cold boundary and <6°C hot. Nominal sensor thresholds are 5/36°C, with tolerance conservatively 2–8/33–39°C. Do not expose the real cell beyond its limits to test the electronics; use a controlled sensor/cell simulator first.

Check supervisor cutoff and depleted-pack recovery cycling, off-state leakage and storage drain. Measure usable capacity/runtime rather than treating the 60 mAh estimate as a guaranteed cell rating. Verify thermal-pad pressure causes no pouch deformation and leaves the specified bottom-component clearance. Record button force/stroke, slider travel, wire bend/abrasion, connector mating, screw engagement, magnet retention and dock force using actual printed parts.

Test RF detached and docked, with the specified phone alignment and representative hand positions, case and battery states. Repeat the phone matrix at agreed ranges and orientations; characterize missed shots and reconnect behavior. No new pass is inferred from electrical simulation, software compile or renderings.
