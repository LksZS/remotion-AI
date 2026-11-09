#!/usr/bin/env bash
# Gate G2: detecta frames mortos (trechos em que a imagem não muda).
# Calibrado nas 4 referências: segura de texto/logo existe, então o critério é por duração agrupada.
#   AVISO  > 0.40 s parado
#   FALHA  > 0.80 s parado (fora do fim)
# O fim (últimos 2.5 s) é "end hold": mede-se à parte (G3: falha se a parte parada do fim > 1.6 s;
# nas 4 referências o end hold ficou entre 1.1 e 1.6 s).
# Uso: freeze_check.sh <video.mp4> [aviso=0.4] [falha=0.8]
set -uo pipefail
V="${1:?uso: freeze_check.sh <video> [aviso] [falha]}"; WARN="${2:-0.4}"; FAIL="${3:-0.8}"
[ -f "$V" ] || { echo "arquivo não encontrado: $V"; exit 2; }
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
ffmpeg -i "$V" -vf "freezedetect=n=-55dB:d=0.1" -f null - 2>&1 \
 | grep -E 'freeze_(start|duration)' | sed -E 's/.*freeze_(start|duration): ([0-9.]+).*/\1 \2/' \
 | awk -v D="$D" -v W="$WARN" -v F="$FAIL" '
  function flush(   len) { if (cs=="") return; len=ce-cs
      if (cs >= D-2.5) { endhold+=len; printf "  fim (permitido): %.2fs -> %.2fs (%.2fs)\n", cs, ce, len }
      else if (len > F) { bad++;  printf "  FALHA : %.2fs -> %.2fs (%.2fs parado)\n", cs, ce, len }
      else if (len > W) { warn++; printf "  aviso : %.2fs -> %.2fs (%.2fs parado)\n", cs, ce, len } }
  $1=="start"    { s=$2 }
  $1=="duration" { e=s+$2
                   if (cs!="" && s <= ce+0.07) { ce=e } else { flush(); cs=s; ce=e } }
  END { flush()
        if (bad>0)  { printf "G2 FAIL: %d trecho(s) parado(s) > %.1fs. Adicione movimento (parallax, drift de luz, respiração de escala, câmera lenta).\n", bad, F; exit 1 }
        else if (endhold > 1.6) { printf "G2 PASS, mas G3 FAIL: end hold %.2fs > 1.6s. Encurte o fechamento.\n", endhold; exit 1 }
        else        { printf "G2 PASS (%d aviso(s)); G3 PASS (end hold %.2fs <= 1.6s)\n", warn+0, endhold+0; exit 0 } }'
