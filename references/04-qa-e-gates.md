# 04. QA e gates

Um gate que falha é **corrigido, não argumentado**. Cite os números no `NOTE.md`. Nunca declare o filme "bom".

| Gate | Condição | Como verificar |
|---|---|---|
| **G0** | O MP4 abre, não é vazio, duração = planejada, áudio presente se planejado | `scripts/qa.sh final.mp4 <duração>` |
| **G1** | Texto de UI legível (≥ ~4% da altura); o objeto de prova aparece grande, iluminado e dentro de um mundo | Olhar a folha de contato (`out/qa_sheets/`) |
| **G2** | Sem frames mortos: nenhum trecho parado > 0,8 s fora do fim (aviso > 0,4 s) | `scripts/freeze_check.sh` |
| **G3** | Fim resolvido: parte parada do fim ≤ 1,6 s; último plano ≤ 25% do filme | `scripts/freeze_check.sh` (end hold) |
| **G4** | Um herói por frame: dois painéis só se um tem 2x a área do outro ou a câmera se move entre eles | Folha de contato |
| **G5** | Zero "page chrome": rótulo de marca no canto, contador "02/05", timecode, colchetes de canto, barra de progresso, kicker sobre título, título parado à esquerda com card à direita, título digitado com cursor, card "dashboard vibe-coded" | Folha de contato + busca no código por `position: absolute` em cantos |
| **C** | **Orçamento de complexidade** (ver SKILL.md): ≥ 6 beats, ≥ 4 camadas por beat, ≥ 3 tipos de transição, ≥ 2 tratamentos de tipografia, 1 momento-herói 3D/DOF, 2 microinterações, objeto-ponte em 3+ beats | **Sem script**: confira a tabela do STORYBOARD.md contra a folha de contato, beat a beat. Declare que foi por olho |

## Calibração honesta do G2/G3
Medidos nas 4 referências (3 fps de amostragem, `freezedetect` -55 dB): nenhuma teve trecho parado > 0,8 s fora do fim; o fim parado ficou entre 0,8 e 1,6 s. Por isso os limites acima. O limite mais rígido citado em estudos externos (≤ 3 frames) vale para movimento de *pixels* e é mais apertado que o das referências; aqui usamos o que as referências provam.

**Importante:** G2 não detecta filme raso. Um único objeto dando zoom passa em G2. Quem pega isso é o **gate C**.

## Processo de revisão (critic loop)
1. Renderize. Rode `scripts/qa.sh`.
2. Abra `out/qa_sheets/*.jpg` e **descreva cada beat em uma linha**. Se você não consegue descrever 6 beats distintos, o filme está raso: volte ao storyboard.
3. Para cada falha: ação específica (ex.: "beat 3 só tem texto sobre fundo: adicionar UI de vidro em Z=-200 + drift de luz").
4. Corrija na ordem: **gate C → G5 → G4 → G1 → G2/G3 → G0**.
5. Repita até passar. Escreva o `NOTE.md` com: ideia, o que é real vs ilustrativo, números dos gates, o que ainda melhoraria, nível (raso / ok / maxxed).

## Checklist de olho (folha de contato a 2 fps)
- ☐ Fundo tem vida em todos os quadros (luz, textura, deriva)?
- ☐ Há profundidade (blur desigual, perspectiva, parallax)?
- ☐ A UI é da marca (detalhe real) e legível?
- ☐ Algum beat é só "texto no meio da tela"? (no máx. 2 de 8)
- ☐ Há ≥ 1 morph de forma e ≥ 1 zoom através do objeto?
- ☐ Há confirmação/microinteração (toque, check, anel, count-up)?
- ☐ A palavra-chave tem destaque (cor + glow)?
- ☐ O fecho é curto, com logo em foco?

## Comandos
```bash
bash scripts/qa.sh out/final.mp4 12            # G0 + G2/G3 + folha de contato
bash scripts/contact_sheet.sh out/final.mp4 3 4 3 480 out/sheets   # 3 fps, para beat a beat
bash scripts/still_grid.sh Main "0 45 90 150 220 300"              # stills dos frames-chave
npx remotion render src/index.ts Main out/final.mp4 --codec=h264 --crf=16
```
