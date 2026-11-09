# 03. Biblioteca "After Effects → código"

Cada receita: **efeito** → como fazer → parâmetros iniciais → armadilha. Componentes em `components/` (typecheck OK com Remotion 4; **não** foram renderizados no ambiente de criação, então valide o primeiro render).

Frames a 30 fps. `sec(s)` converte segundos em frames.

## Estrutura de projeto

```
src/
  Root.tsx          // <Composition id="Main" width={1920} height={1080} fps={30} durationInFrames={sec(12)} />
  Film.tsx          // um <Sequence> por beat + mundo vivo por baixo + <Grain/> por último
  components/       // copie de components/ desta skill
  brand/            // logo.svg oficial, fontes, prints reais
```

Seek-safe: nada de `Math.random()`, `Date.now()`, `setTimeout`. Ruído = `@remotion/noise` (determinístico).

---

## 1. Câmera 3D contínua (tilt que endireita, dolly, orbit)
`<Camera keys=[{f,rx,ry,rz,x,y,z,s}] />` com `perspective` 1200 a 1600.
- Abertura: `rx: 55→0`, `y: 160→0`, `s: 1.1→1`, 24 a 36 f, `inOut`.
- Orbit leve de cena de respiro: `ry: -6→6` em 90 f.
- Armadilha: `overflow: hidden` em ancestral achata o 3D. Mantenha `transform-style: preserve-3d` na cadeia.

## 2. Profundidade de campo / rack focus
`<DepthLayer z focusKeys>`; blur = |z − foco| × `blurPerPx` (0,02), máx 24 px. Anime `focusKeys` para puxar foco de um plano a outro.
- Entrada de logo: começa com blur 18 px e foco em outro plano; 14 a 18 f até nítido.
- Armadilha: blur em camada com `backdrop-filter` pode lavar; aplique o blur no wrapper.

## 3. Orbe → pílula → ícone → botão → logo (objeto-ponte)
1. Orbe: círculo 28 px branco, `box-shadow: 0 0 40px #fff`, com número (0).
2. `ShapeMorph from={w:28,h:28,r:14} to={w:300,h:110,r:55}` 10 a 14 f, `softLand`.
3. Conteúdo da pílula só aparece quando a largura passa de ~60% (máscara/opacity por progresso).
4. Reutilize a MESMA pílula como botão "Start" (muda largura/cor) e depois como barra dentro do logo.
- Regra: o objeto-ponte atravessa ≥ 3 beats.

## 4. Count-up + anel de progresso
`<RingCounter to max start dur label icon />`. Número com `tabular-nums` (não "dança"). Label entra 8 a 20 f depois com blur 8 → 0.
- Cascata entre pílulas: 3 a 5 f.
- Armadilha: arredonde o número (`Math.round`) para evitar casas decimais piscando.

## 5. Texto cinético por palavra + palavra-chave
`<KineticText words highlight start stagger dur dimPrevious />`.
- Entrada: `translateY 36→0`, `blur 12→0`, `opacity` sobe nos primeiros 40%. 12 f por palavra, stagger 2 a 3 f.
- Palavra-chave: cor viva + `text-shadow: 0 0 24px cor`. Para glow *difuso atrás* (estilo ref B), adicione um `div` com `radial-gradient` + `blur(40px)` atrás da palavra e anime a opacidade 0→0,8.
- `dimPrevious`: palavras anteriores caem para cinza quando a próxima entra (estilo "Playlists" → "Made For You").

## 6. Troca de palavra com glitch de letras (ref B: constantly → changing)
- Quebre a palavra em letras (`<span>` por letra). Fase 1 (6 f): cada letra recebe `translateY` aleatório **com seed** (`noise2D`) e blur. Fase 2: troque o texto no frame exato do pico de blur. Fase 3 (8 f): letras novas assentam em cascata (1 a 2 f).
- Glow vermelho radial atrás durante a troca.

## 7. Marquee/whip horizontal com motion blur
- Frase em `translateX` de +W para −W, 18 a 24 f, `inOut`. Blur direcional: SVG `feGaussianBlur stdDeviation="X 0"` com X de 0 → 24 → 0 (ou `<CameraMotionBlur>` de `@remotion/motion-blur`, `samples` 8 a 12).
- Logo ou palavra anterior é empurrado para fora pela nova.

## 8. Mesh gradient vivo
`<MeshGradient colors blur speed />` (3 a 5 blobs por ruído, `blur` 100 a 140 px). Troque as cores ao longo do filme com `interpolateColors` de Remotion e passe por `colors`. Fundo deve **evoluir** com a ideia: mais claro/vivo nas cenas de energia, mais escuro com mancha nas de UI.

## 9. UI em vidro (glassmorphism) sobre foto/vídeo
`<GlassCard tint />`: gradiente 145°, `backdrop-filter: blur(24px) saturate(140%)`, borda 1 px branca 28%, `inset 0 1px 0` de reflexo, sombra grande suave. Em cima de foto: 3 cards em planos Z diferentes com **parallax** (cada um move 8 a 20 px com a câmera) e primeiro plano desfocado.
- Armadilha: `backdrop-filter` não funciona dentro de elemento com `filter` ou `opacity < 1` em alguns casos; aplique opacidade no filho.

## 10. Shape morph (quadrado/pílula → tela de app)
`<ShapeMorph from to start dur background glow>` e revele a UI com `clip-path: inset(...)` enquanto cresce. Adicione **warp**: nos 40% iniciais, `rotateX/rotateZ` 6 a 10° e volte a 0.
- Brilho de borda: `box-shadow: 0 0 60px cor` + borda 1 px clara.

## 11. Anel de toque / cursor
`<CursorTap x y at />` 14 f. A UI reage 2 a 3 f depois: botão `scale 1 → 0,96 → 1` em 8 f (+ sombra encolhe).
- Cursor real (ponteiro) opcional: curva de Bézier até o alvo, 18 a 24 f, `softLand`.

## 12. Zoom macro contínuo (ref D: player → botão +)
Câmera `z` de 0 → 1200 (ou `s` 1 → 6) em 40 a 60 f, `inOut`, com motion blur; mantenha a barra de progresso/controles como **trilho** que guia o olhar até o alvo. O alvo (+) vira o próximo objeto (check).

## 13. + vira check com anel que fecha
Círculo verde escala 1 → 1,08 → 1 (10 f); `<circle>` com `stroke-dashoffset` de perímetro → 0 em 12 f; check (path) desenha em 8 f. Toast sobe 20 px (`softLand`) 8 f depois.

## 14. Cadeado fecha + glow de alerta
Haste do cadeado desce 6 px em 4 f; corpo faz `scale 1 → 0,96 → 1` (6 f). Glow vermelho radial pulsa: `opacity` 0,35 ↔ 0,9 a cada 14 f (use `Math.sin(frame * 2π / 14)`; determinístico).

## 15. Colchete/linha desenhada
SVG `path` com `stroke-dasharray = comprimento`, `stroke-dashoffset` de comprimento → 0 em 14 f. Use para ligar elementos ("Score" a 3 pílulas) e para régua editorial em volta de frase.

## 16. Colagem em anel (ref B)
12 a 15 retângulos com fotos reais do cliente, posicionados em elipse (cos/sin), rotação ±8°, tamanhos 1 a 1,5x; entrada em cascata 2 f; rotação lenta contínua (0,15°/f). Fundo gradiente rosa/cor de marca; frase ao centro com régua fina.
- Sem fotos? **Não invente** com IA; use blocos de cor da marca ou peça assets.

## 17. Grid de capas em perspectiva diagonal (ref D)
Grid 6×N de quadrados com `rotateX 55° rotateZ −30°`, `translateX` contínuo (scroll). Acelera na saída. Texto inclinado no mesmo plano (mesma rotação) para "colar" no grid.

## 18. Aberração cromática + scan (ícone neon)
Duplique o ícone em 3 camadas (R/G/B) com `mix-blend-mode: screen` e offset de ±3 px; linha branca vertical (2 px, glow) cruza em 6 f. Para qualidade maior, use filtro de displacement no PixiJS.

## 19. Flash branco de transição
Overlay branco `opacity` 0 → 1 → 0 em 8 f no frame de corte; o próximo plano já entra em movimento. Use no máximo 1 a 2 vezes.

## 20. Logo reveal
Entra de ~3,5x desacelerando 12 a 16 f com blur 18 → 0 (rack focus); linha de scan/brilho passa; assenta e **encolhe 4 a 8%**. Depois URL pequena com fade; escurece. Fecho total 0,6 a 1,6 s.

## 21. Luz, grain, vinheta
`<Grain opacity=0.06 vignette=0.35/>` por último. Halo no topo: `radial-gradient(ellipse at 50% -10%, rgba(180,170,255,0.18), transparent 60%)`. Uma fonte de luz que deriva devagar (±40 px em 120 f).

## 22. Dim de contexto
Ao entrar a nova palavra, as anteriores vão a 40% de opacidade/cinza em 10 f. Mantém leitura e hierarquia.

---

## Receita de ritmo (a "partitura")
- Beat denso (2 a 2,5 s): 4+ camadas, 2 ações simultâneas.
- Beat de respiro (1 a 1,5 s): 1 elemento + glow, texto curto.
- Alterne denso/respiro. Acelere perto do clímax (beats de 1 a 1,3 s), assente no fecho.
- Em cada transição, pergunte: **o que ela compra?** (continuidade, surpresa, foco, mudança de escala). Se nada, mude.

## PixiJS (só quando necessário)
Use para displacement/aberração/bloom fortes. Controle o ticker **manualmente** pelo frame do Remotion (`app.ticker.stop(); app.render()` a cada frame), nunca pelo relógio real. Se CSS resolve, use CSS.

## Theatre.js (opcional)
Para ajustar curvas visualmente: crie um `sheet` e defina `sheet.sequence.position = frame / fps` a cada frame; exporte o estado e congele em JSON para render. Use só em refinamento, não no esqueleto.
