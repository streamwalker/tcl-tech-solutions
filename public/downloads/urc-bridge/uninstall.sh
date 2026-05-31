#!/usr/bin/env bash
# Removes the urc-rose-bridge launchd daemon and install directory.
set -euo pipefail

LABEL="com.tcltech.urc-rose-bridge"
PLIST="/Library/LaunchDaemons/$LABEL.plist"
INSTALL_DIR="/usr/local/urc-rose-bridge"

if [ "$(id -u)" -ne 0 ]; then
  echo "error: run with sudo." >&2
  exit 1
fi

echo "==> stopping daemon"
launchctl bootout system "$PLIST" 2>/dev/null || true

echo "==> removing plist"
rm -f "$PLIST"

echo "==> removing $INSTALL_DIR"
rm -rf "$INSTALL_DIR"

echo "==> done. logs in /usr/local/var/log/urc-rose-bridge.*.log preserved."