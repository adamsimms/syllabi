#!/usr/bin/env bash
# Re-download PHOT 332 assets from Google Drive into the repo.
# Requires: pip install gdown
set -euo pipefail

export PATH="${HOME}/.local/bin:${PATH}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/PHOT 332 – Digital Photography II/assets"

mkdir -p "$ASSETS/readings" "$ASSETS/samples" "$ASSETS/manuals" "$ASSETS/raw"

download() {
  local id="$1" out="$2"
  gdown "https://drive.google.com/uc?id=$id" -O "$out"
}

# Readings
download 16FgB3KFmEbJk-qijPoK5U7UlpbQXwDoI "$ASSETS/readings/nonhuman-photography.pdf"
download 18RfJrptWOBpQTKj_Tw2JWfVKlwmpcyh0 "$ASSETS/readings/artificial-aesthetics.pdf"
download 1QJqQ1S4J7ejzmJZC6iTiOCBZu_6KR2WV "$ASSETS/readings/duty-free-art.pdf"
download 1Z9N_ioXo5RoaNFuIfjfOYi8KRl8b5yYk "$ASSETS/readings/immediacy.pdf"
download 1I5KGhizFQcHanxbBDFXRoOjXaWGzg_pt "$ASSETS/readings/disordered-attention.pdf"
download 1gx-dqOhfKolLktYiyIkUXXvKtMLu6hQu "$ASSETS/readings/perception-machine.pdf"
download 196Z60TqZmDVse5n725F-dGC6OzFfJ7Vd "$ASSETS/readings/perception-machine-reading.pdf"

# Weekly sample archives
download 1nj355exU5kabHpj_B4G1eqjI1V-R4KsS "$ASSETS/samples/week-03-sample-images.zip"
download 1RH-0nFInewnrISoBebvgUsIXrrKxFGdd "$ASSETS/samples/week-04-sample-images.zip"
download 1dLXe2IqWAplzU3qQjGAzLC_c5ITy0x2o "$ASSETS/samples/week-05-sample-images.zip"
download 1mORQAEc2OpA8XG-zuZ0IS7k2mFf9nEVI "$ASSETS/samples/week-06-sample-images.zip"

# Manuals & equipment
download 1yoijN8ZsveVunOkjpBoDQ4tok9oEyLlu "$ASSETS/manuals/photography-equipment-list.pdf"
download 16COOfu5EKTRA60PEzfP9jENmj57A9bfN "$ASSETS/manuals/imacon-flextight-hardware.pdf"
download 1NfYa5CdMZ5mXtTh9IVmLQGsjM9IkC2S4 "$ASSETS/manuals/imacon-flexcolor-software.pdf"

# Example RAW files
gdown --folder "https://drive.google.com/drive/folders/1Hpw-fZeol80G_99tj8hMtCjs_LQuSWhE" -O "$ASSETS/raw"

echo "Done. Assets in: $ASSETS"
