#!/bin/sh
set -eu
# All downloaded dependencies and build output remain within this revision.
task_root="$PWD"
export ZEPHYR_BASE="$task_root/firmware/deps/zephyr"
: "${ZEPHYR_SDK_INSTALL_DIR:?Set the task-local Zephyr SDK directory with riscv64-zephyr-elf}"
export ZEPHYR_TOOLCHAIN_VARIANT=zephyr
cd "$task_root/firmware/deps"
exec ../.venv/bin/python -m west build -b esp32c3_devkitc/esp32c3 .. -d ../build-c3 "$@"
