#!/usr/bin/env bash
# Renderiza stills do Remotion em frames-chave e monta uma grade para revisão visual.
# Uso: still_grid.sh <CompositionId> "0 30 60 90 120 150" [entry=src/index.ts]
set -euo pipefail
COMP="${1:?uso: still_grid.sh <CompositionId> \"f1 f2 ...\" [entry]}"
FRAMES="${2:?lista de frames}"
ENTRY="${3:-src/index.ts}"
mkdir -p out/stills
for f in $FRAMES; do npx remotion still "$ENTRY" "$COMP" "out/stills/f$(printf %04d "$f").png" --frame="$f" >/dev/null; done
N=$(echo $FRAMES | wc -w)
COLS=3; ROWS=$(( (N + COLS - 1) / COLS ))
ffmpeg -v error -pattern_type glob -i 'out/stills/f*.png' -vf "scale=640:-1,tile=${COLS}x${ROWS}" -frames:v 1 out/stills_grid.png -y
echo "Grade: out/stills_grid.png"
