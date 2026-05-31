#!/usr/bin/env bash
# Self-updater for urc-rose-bridge. Polls the release manifest, verifies
# sha256, swaps the binary in place, restarts the daemon.
set -euo pipefail

MANIFEST_URL="${MANIFEST_URL:-https://bridge.tcltechsolutions.com/api/public/releases/latest}"
INSTALL_DIR="/usr/local/urc-rose-bridge"
LABEL="com.tcltech.urc-rose-bridge"
CURRENT_VERSION_FILE="$INSTALL_DIR/VERSION"

if [ "$(id -u)" -ne 0 ]; then
  echo "error: run with sudo." >&2
  exit 1
fi

if ! command -v curl >/dev/null; then
  echo "error: curl is required." >&2; exit 1
fi

echo "==> fetching $MANIFEST_URL"
MANIFEST="$(curl -sf "$MANIFEST_URL")"
if [ -z "$MANIFEST" ]; then
  echo "error: empty manifest response." >&2; exit 1
fi

get() { echo "$MANIFEST" | sed -n "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" | head -n1; }
VERSION="$(get version)"
URL="$(get url)"
SHA="$(get sha256)"

if [ -z "$VERSION" ] || [ -z "$URL" ] || [ -z "$SHA" ]; then
  echo "error: manifest missing version/url/sha256." >&2
  echo "$MANIFEST" >&2
  exit 1
fi

CURRENT=""
if [ -f "$CURRENT_VERSION_FILE" ]; then CURRENT="$(cat "$CURRENT_VERSION_FILE")"; fi
if [ "$CURRENT" = "$VERSION" ]; then
  echo "==> already on $VERSION."
  exit 0
fi

TMP="$(mktemp -d)"
ARCHIVE="$TMP/urc-rose-bridge-$VERSION.tar.gz"
echo "==> downloading $URL"
curl -fL "$URL" -o "$ARCHIVE"

echo "==> verifying sha256"
ACTUAL="$(shasum -a 256 "$ARCHIVE" | awk '{print $1}')"
if [ "$ACTUAL" != "$SHA" ]; then
  echo "error: sha256 mismatch. expected $SHA, got $ACTUAL" >&2
  exit 1
fi

echo "==> extracting"
tar xzf "$ARCHIVE" -C "$TMP"
SRC_DIR="$(find "$TMP" -maxdepth 2 -type d -name 'urc-rose-bridge-macos-arm64*' | head -n1)"
if [ -z "$SRC_DIR" ]; then SRC_DIR="$TMP"; fi

echo "==> stopping daemon"
launchctl kill TERM "system/$LABEL" 2>/dev/null || true
sleep 1

echo "==> swapping binaries"
cp "$SRC_DIR"/urc-rose-bridge "$INSTALL_DIR/urc-rose-bridge.new"
cp "$SRC_DIR"/urc-rose-probe "$INSTALL_DIR/urc-rose-probe.new" 2>/dev/null || true
mv "$INSTALL_DIR/urc-rose-bridge.new" "$INSTALL_DIR/urc-rose-bridge"
[ -f "$INSTALL_DIR/urc-rose-probe.new" ] && mv "$INSTALL_DIR/urc-rose-probe.new" "$INSTALL_DIR/urc-rose-probe"
xattr -dr com.apple.quarantine "$INSTALL_DIR" 2>/dev/null || true
chmod +x "$INSTALL_DIR/urc-rose-bridge" "$INSTALL_DIR/urc-rose-probe" 2>/dev/null || true
echo "$VERSION" > "$CURRENT_VERSION_FILE"

echo "==> restarting daemon"
launchctl kickstart -k "system/$LABEL"

rm -rf "$TMP"
echo "==> updated to $VERSION."