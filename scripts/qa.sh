#!/usr/bin/env bash
# QA rápido do MP4 final: G0 (existe/decodifica/duração), G2 (frames parados) e folha de contato.
# Uso: qa.sh <final.mp4> [duracao_esperada_s]
set -uo pipefail
V="${1:?uso: qa.sh <final.mp4> [duracao_s]}"; EXP="${2:-}"
DIR="$(cd "$(dirname "$0")" && pwd)"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
echo "G0: duração=${D}s"
if [ -n "$EXP" ]; then awk -v d="$D" -v e="$EXP" 'BEGIN{ if ((d-e)<0.2 && (e-d)<0.2) print "G0 PASS: duração confere"; else print "G0 FAIL: esperado " e "s" }'; fi
bash "$DIR/freeze_check.sh" "$V"
mkdir -p out && bash "$DIR/contact_sheet.sh" "$V" 2 4 4 480 out/qa_sheets >/dev/null && echo "Folha de contato: out/qa_sheets/ (revise G1, G4, G5 e o gate C olhando)"
