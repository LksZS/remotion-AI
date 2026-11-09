# 01. DNA visual e leis de movimento

## 1. DNA visual (comum às 4 referências)

1. **Câmera contínua.** Cenas nascem da anterior: morph de forma, zoom *através* de um objeto, tilt que se corrige, rack focus. Cortes por fade são exceção.
2. **Profundidade real.** `perspective` + camadas em Z + **blur proporcional à distância do foco** + rotateX/Y. UI inclinada que "endireita" é o gesto mais usado para abrir cena.
3. **UI como personagem.** Componentes reais da marca, reconstruídos em código, em escala grande, iluminados (glow, borda de 1 px, reflexo), nunca "card genérico".
4. **Orbe/pílula como semente.** Muita coisa nasce de um ponto de luz ou de uma pílula pequena que cresce e vira UI/logo (nada nasce do tamanho zero cru).
5. **Texto cinético curto.** 2 a 5 palavras por tela, uma palavra destacada (cor + glow + às vezes outra fonte/itálico), entrada por palavra ou por letra com blur.
6. **Cor com função.** Fundo contido (preto, branco, mesh gradient da marca); cor viva reservada ao dado/ação (barra que brilha, palavra-chave, botão, alerta com glow).
7. **Motion blur direcional** em whip, marquee e entrada rápida (shutter ~180°). Blur *estático* (desfoque) para profundidade de campo.
8. **Microinterações.** Anel de toque, count-up (0→67), anel de progresso que fecha, toggle, botão que afunda, cadeado que fecha, check que confirma, toast.
9. **Ritmo.** Alterna *cena densa* (muita coisa) e *cena respiro* (1 elemento + glow). Quase sempre há algo se movendo.
10. **Fechamento curto.** Logo (frequentemente entra desfocado e ganha foco) + URL/CTA; 0,6 a 1,6 s; escurece/some no fim.

## 2. Leis de movimento (30 fps)

| Lei | Valor |
|---|---|
| Movimento mediano | ~10 f (0,33 s) |
| Entrada de elemento | 11 a 12 f, `softLand` |
| Fade | ~6 f |
| Blur de entrada/saída | 7 a 8 f |
| Stagger entre palavras | 2 a 3 f |
| Stagger entre letras | 1 a 2 f |
| Cascata de cards/pílulas | 3 a 5 f |
| Count-up | 18 a 30 f, `softLand` (acelera no início, assenta no fim) |
| Aterrissa | desacelera (ease-out) |
| Sai | acelera (ease-in) |
| Nada nasce do zero | entra de maior, da borda, ou de um orbe |
| Overshoot | raro (< 9%), tardio, pequeno |
| Corte | em movimento |
| Frames parados | no máximo 3 seguidos |
| Fim | 0,6 a 1,6 s; último plano ≤ 25% do filme |

## 3. Easings iniciais (calibrar pelo olho)

```ts
import {Easing} from "remotion";
export const ease = {
  softLand:   Easing.bezier(0.16, 1, 0.3, 1),     // entradas
  snapSettle: Easing.bezier(0.2, 0.9, 0.25, 1),   // chega rápido e assenta
  accelExit:  Easing.bezier(0.55, 0, 0.9, 0.45),  // saídas
  lateLean:   Easing.bezier(0.3, 0, 0.2, 1.06),   // passada leve da marca (usar pouco)
  inOut:      Easing.bezier(0.65, 0, 0.35, 1),    // câmera/pan longos
};
```

## 4. Mundos (fundos vivos), escolha UM por filme e deixe-o evoluir

- **Preto com halo no topo** (ref A): fundo ~#0A0A0C, radial-gradient lilás-acinzentado no topo (~10% opacidade), vinheta, grain. UI de vidro escuro. Cor só nos dados.
- **Branco limpo** (ref B): #FFFFFF, tipografia preta grotesca, **uma palavra em cor viva com glow difuso** atrás; colagem/foto em gradiente da marca no clímax.
- **Cor de marca saturada → claro → escuro** (ref C): roxo profundo com luz de borda, alternando com telas claras e branco final.
- **Mesh gradient vivo** (ref D): 3 a 5 blobs desfocados (verde sobre quase-preto) que derivam por ruído; UI escura por cima; fundo muda de "claro-vivo" para "escuro com mancha" conforme o texto.

Todo fundo recebe: **grain sutil** (opacidade 4 a 8%), **vinheta**, e **uma fonte de luz** (halo/mancha) que se move devagar.

## 5. Tipografia

- Uma família principal grotesca/geométrica, pesos 500 a 700; tracking levemente negativo em títulos grandes.
- Tratamentos que aparecem nas referências (use ≥ 2):
  1. **Por palavra** com blur+translateY em cascata e **palavra-chave destacada** (cor, glow, peso/itálico diferente).
  2. **Letra a letra com onda** (letras desalinhadas na vertical antes de assentar; troca de palavra com "glitch" de letras).
  3. **Marquee/whip horizontal** com motion blur forte (frase empurrada para fora da tela).
  4. **Texto inclinado em 3D** sobre grid/fundo em perspectiva.
  5. **Frase com linhas finas** (régua/colchete) ao redor, estilo editorial.
  6. **Dim de contexto**: palavras anteriores caem para cinza enquanto a nova ganha branco/bold ("Playlists" cinza, "Made For You" branco).
- Texto de UI ≥ ~4% da altura do quadro (legível em celular). Safe areas em 9:16.

## 6. Cor

- Fundo contido; cor da marca só no que importa.
- Brilho = cor viva + `box-shadow`/`filter: drop-shadow` difuso + halo radial atrás.
- Alerta (vermelho) pulsa em ~12 a 18 f.
- Duas cores de dado complementares (ex.: ciano + laranja) são suficientes.

## 7. Áudio (quando houver)

Trilha com BPM; hits/cortes na batida; SFX curtos (toque, whoosh, impacto de logo, "tick" de count-up). Mix ≈ -14 LUFS / -1 dBTP. Sem áudio, o filme precisa funcionar mudo.
