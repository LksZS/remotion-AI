#!/usr/bin/env bash
# Gera folhas de contato com timestamp de um vídeo (para VER o vídeo como imagens).
# Uso: contact_sheet.sh <video.mp4> [fps=3] [cols=4] [rows=3] [largura=480] [saida=./sheets]
# Dica: anexe as imagens geradas no chat, quando não for possível anexar o vídeo.
set -euo pipefail
V="${1:?uso: contact_sheet.sh <video> [fps] [cols] [rows] [largura] [saida]}"
[ -f "$V" ] || { echo "arquivo não encontrado: $V"; exit 2; }
FPS="${2:-3}"; COLS="${3:-4}"; ROWS="${4:-3}"; W="${5:-480}"; OUT="${6:-./sheets}"
mkdir -p "$OUT"
FONT="$(fc-list 2>/dev/null | grep -i -m1 'DejaVuSans.ttf' | cut -d: -f1 || true)"
[ -z "$FONT" ] && FONT="$(fc-list 2>/dev/null | head -1 | cut -d: -f1 || true)"
DT=""
[ -n "$FONT" ] && DT="drawtext=fontfile=${FONT}:text='%{pts\:hms}':x=6:y=6:fontsize=16:fontcolor=white:box=1:boxcolor=black@0.6,"
ffmpeg -v error -i "$V" -vf "fps=${FPS},scale=${W}:-1,${DT}tile=${COLS}x${ROWS}" -q:v 4 "$OUT/sheet_%02d.jpg" -y
echo "Folhas em $OUT (cada quadro = $(awk "BEGIN{printf \"%.2f\", 1/${FPS}}") s). Abra e descreva beat a beat."
ffprobe -v error -show_entries format=duration -show_entries stream=width,height,r_frame_rate -of default=nw=1 "$V"
