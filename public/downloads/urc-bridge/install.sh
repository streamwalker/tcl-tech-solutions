#!/usr/bin/env bash
# urc-rose-bridge installer (macOS arm64)
# Installs the bridge to /usr/local/urc-rose-bridge, registers it as a
# system launchd daemon, and runs a health check.
set -euo pipefail

INSTALL_DIR="/usr/local/urc-rose-bridge"
LOG_DIR="/usr/local/var/log"
PLIST_SRC="$(cd "$(dirname "$0")" && pwd)/com.tcltech.urc-rose-bridge.plist"
PLIST_DST="/Library/LaunchDaemons/com.tcltech.urc-rose-bridge.plist"
LABEL="com.tcltech.urc-rose-bridge"
PORT="${BRIDGE_PORT:-8088}"

if [ "$(id -u)" -ne 0 ]; then
  echo "error: run with sudo (needs to write /Library/LaunchDaemons and /usr/local)." >&2
  exit 1
fi

if [ ! -f "$PLIST_SRC" ]; then
  echo "error: plist not found at $PLIST_SRC" >&2
  exit 1
fi

ARCHIVE="$(ls urc-rose-bridge-macos-arm64*.tar.gz 2>/dev/null | head -n1 || true)"
if [ -z "$ARCHIVE" ]; then
  echo "error: place urc-rose-bridge-macos-arm64-*.tar.gz in this directory before running." >&2
  exit 1
fi

echo "==> extracting $ARCHIVE"
TMP="$(mktemp -d)"
tar xzf "$ARCHIVE" -C "$TMP"
SRC_DIR="$(find "$TMP" -maxdepth 2 -type d -name 'urc-rose-bridge-macos-arm64*' | head -n1)"
if [ -z "$SRC_DIR" ]; then SRC_DIR="$TMP"; fi

echo "==> staging $INSTALL_DIR"
mkdir -p "$INSTALL_DIR" "$LOG_DIR"
cp -R "$SRC_DIR"/* "$INSTALL_DIR/"
xattr -dr com.apple.quarantine "$INSTALL_DIR" 2>/dev/null || true
chmod +x "$INSTALL_DIR/urc-rose-bridge" "$INSTALL_DIR/urc-rose-probe" 2>/dev/null || true

if [ ! -f "$INSTALL_DIR/.env" ] && [ -f "$INSTALL_DIR/.env.example" ]; then
  cp "$INSTALL_DIR/.env.example" "$INSTALL_DIR/.env"
  echo "==> wrote default .env (edit $INSTALL_DIR/.env to set ROSE_HOST)"
fi

echo "==> installing launchd plist"
cp "$PLIST_SRC" "$PLIST_DST"
chown root:wheel "$PLIST_DST"
chmod 644 "$PLIST_DST"

launchctl bootout system "$PLIST_DST" 2>/dev/null || true
launchctl bootstrap system "$PLIST_DST"
launchctl enable "system/$LABEL"
launchctl kickstart -k "system/$LABEL"

echo "==> waiting for bridge to come up on :$PORT"
OK=0
for i in $(seq 1 15); do
  if curl -sf "http://127.0.0.1:$PORT/v1/health" >/dev/null; then
    OK=1
    break
  fi
  sleep 1
done

if [ "$OK" -eq 1 ]; then
  echo "==> healthy: http://127.0.0.1:$PORT/v1/health"
  curl -s "http://127.0.0.1:$PORT/v1/health"
  echo
  echo "==> install complete."
else
  echo "warning: bridge did not respond on :$PORT within 15s" >&2
  echo "check logs: tail $LOG_DIR/urc-rose-bridge.err.log" >&2
  exit 1
fi

rm -rf "$TMP"