#!/bin/sh
set -eu
# Invoke from this board project's root; SDK and outputs remain task-local.
: "${GNUARMEMB_TOOLCHAIN_PATH:?Set the installed GNU Arm Embedded toolchain directory}"
export PATH="$PWD/firmware/.venv/bin:$PATH"
export ZEPHYR_BASE="$PWD/firmware/deps/zephyr"
export ZEPHYR_TOOLCHAIN_VARIANT=gnuarmemb
exec firmware/.venv/bin/python -m west build -b grip_shutter firmware -d firmware/build "$@"
