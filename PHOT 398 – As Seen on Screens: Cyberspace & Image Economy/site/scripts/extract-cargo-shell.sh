#!/usr/bin/env bash
# Re-extract Cargo shell assets from phot398.cargo.site into site/assets/cargo/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/assets/cargo"
MIRROR="/tmp/phot398-cargo-mirror"
SITE="https://phot398.cargo.site"

mkdir -p "$ASSETS/fonts" "$MIRROR"

wget --mirror --convert-links --adjust-extension --page-requisites --no-parent \
  -e robots=off \
  -P "$MIRROR" \
  "$SITE/Overview" >/dev/null 2>&1

cp "$MIRROR/phot398.cargo.site/stylesheet?"*".css" "$ASSETS/member.css"

python3 << PY
from pathlib import Path
import re

html = Path("$MIRROR/phot398.cargo.site/Overview.html").read_text()
out = Path("$ASSETS")

platform = re.search(r'<style id="">(.*?)</style>', html, re.DOTALL).group(1)
platform = platform.replace('https://static.cargo.site/assets/social/IconFont-Regular-0.9.3.woff2', '../fonts/IconFont-Regular-0.9.3.woff2')
(out / 'platform.css').write_text(platform)

faces = re.findall(r'@font-face\s*\{[^}]*type\.cargo\.site[^}]*\}', html)
(out / 'fonts.css').write_text('\n'.join(faces).replace('https://type.cargo.site/files/', '../fonts/'))

styles = dict(re.findall(r'<style class="local-css" data-target="(\d+)">(.*?)</style>', html, re.DOTALL))
(out / 'local-nav.css').write_text(styles.get('21252714', ''))
(out / 'local-content.css').write_text(styles.get('21258661', ''))
PY

for f in NittiGrotesk-Light.woff NittiGrotesk-LightItalic.woff NittiGrotesk-Normal.woff \
  NittiGrotesk-Italic.woff NittiGrotesk-Bold.woff NittiGrotesk-BoldItalic.woff \
  NeueHaasGroteskText-Regular.woff NeueHaasGroteskText-Italic.woff \
  NeueHaasGroteskText-Medium.woff NeueHaasGroteskText-MediumItalic.woff \
  NeueHaasGroteskText-Bold.woff NeueHaasGroteskText-BoldItalic.woff; do
  curl -sL "https://type.cargo.site/files/$f" -o "$ASSETS/fonts/$f"
done

curl -sL "https://static.cargo.site/assets/social/IconFont-Regular-0.9.3.woff2" \
  -o "$ASSETS/fonts/IconFont-Regular-0.9.3.woff2"

echo "Cargo shell assets updated in $ASSETS"
