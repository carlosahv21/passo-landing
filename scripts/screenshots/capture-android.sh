#!/usr/bin/env bash
# Captura los pantallazos de la app (Android por cable) para el carrusel del Hero.
#
# Requisitos: adb instalado, celular con depuración USB activa, la app abierta
# con la academia demo. Uso:
#   bash scripts/screenshots/capture-android.sh          # todos los slides
#   bash scripts/screenshots/capture-android.sh 2        # solo el slide 2
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
CONF="$HERE/shots.config.json"
RAW="$HERE/raw"
mkdir -p "$RAW"
ONLY="${1:-}"

command -v adb >/dev/null || { echo "No encuentro adb. Instálalo con: brew install --cask android-platform-tools"; exit 1; }
[ "$(adb devices | grep -c 'device$')" -ge 1 ] || { echo "No hay ningún Android conectado (adb devices)."; exit 1; }

# Alturas de las barras del sistema, para recortarlas en compose.py
# Si cropTop/cropBottom están en 0, se estiman con la densidad del celular
# (barra de estado ~36dp, barra de gestos ~24dp) y se guardan en el config.
DENSITY=$(adb shell wm density | grep -oE '[0-9]+' | tail -1)
python3 - "$CONF" "$DENSITY" <<'PY'
import json, sys
path, density = sys.argv[1], int(sys.argv[2])
c = json.load(open(path)); a = c.setdefault("android", {})
if not a.get("cropTop") and not a.get("cropBottom"):
    a["cropTop"] = round(36 * density / 160)
    a["cropBottom"] = round(24 * density / 160)
    json.dump(c, open(path, "w"), indent=2, ensure_ascii=False)
print(f"Densidad {density} dpi. Recorte: arriba {a['cropTop']} px, abajo {a['cropBottom']} px")
PY

# Modo demo: hora 9:41, batería llena, sin notificaciones en la barra
adb shell settings put global sysui_demo_allowed 1
demo() { adb shell am broadcast -a com.android.systemui.demo -e command "$@" >/dev/null; }
demo enter
demo clock -e hhmm 0941
demo battery -e level 100 -e plugged false
demo network -e wifi show -e level 4
demo network -e mobile show -e level 4 -e datatype none
demo notifications -e visible false
trap 'demo exit; echo "Modo demo desactivado."' EXIT

# Recorre los slides del config
COUNT=$(python3 -c "import json;print(len(json.load(open('$CONF'))['slides']))")
for i in $(seq 1 "$COUNT"); do
  [ -n "$ONLY" ] && [ "$ONLY" != "$i" ] && continue
  read -r FILE SCREEN < <(python3 -c "
import json;s=json.load(open('$CONF'))['slides'][$i-1]['app']
print(s['file'], s.get('screen',''))")
  if [ -z "$SCREEN" ]; then
    echo "Slide $i: se exporta del mockup -> raw/$FILE (no se captura)"
    continue
  fi
  echo
  echo "Slide $i: abre en el celular la pantalla \"$SCREEN\" y presiona Enter."
  read -r _
  adb exec-out screencap -p > "$RAW/$FILE"
  echo "  -> raw/$FILE"
done

echo
echo "Listo. Si la barra de estado o la de navegación se ven en el resultado,"
echo "ajusta android.cropTop / android.cropBottom en shots.config.json (px)."
