# 02. Fichas quadro a quadro das referências

> Fonte: análise de folhas de contato a 3 fps (1 quadro = 0,33 s). Tempos são **estimativas de ±0,3 s**; durações de transição foram inferidas pelo blur/posição entre quadros. As imagens com timestamp estão em `references/frames/`. **Abra-as** para ver o que está descrito aqui.
> Uso: referência de **linguagem de movimento e densidade**. Não copie marcas, logos nem textos.

Legenda de camadas: **W** = mundo/fundo, **U** = UI/objeto, **T** = tipografia, **F** = FX (glow, blur, grain, luz).

---

## REF A: App de foco, mundo escuro (16:9, 12 s) → `frames/refA_*`

**Objeto-ponte:** o orbe/pílula de luz (nasce como ponto branco, vira pílula com número, vira ícone, vira botão "Start", vira logo).

| t (s) | Beat | O que acontece | Camadas | Câmera / transição |
|---|---|---|---|---|
| 0,0 a 1,3 | Gráfico em perspectiva | UI de gráfico semanal "9h 15m" inclinada, vista rasante; câmera sobe e **endireita** o plano | W preto + halo; U painel de vidro em perspectiva forte; F blur nas bordas | `rotateX` alto → baixo, `softLand`; começa já em movimento |
| 1,3 a 2,0 | Barra destaque | Zoom em uma barra: **ciano brilha**, depois uma **barra laranja empilha** em cima (glow) | U gráfico com linha tracejada "avg"; F glow ciano/laranja por `drop-shadow` | Push-in + rack focus: as outras barras ficam cinza e levemente desfocadas |
| 2,0 a 2,4 | Orbe | Tela escurece; surge um **orbe branco com "0"** | W preto; U orbe com halo; F bloom | Corte em movimento: o gráfico sai desfocado e o orbe já se move |
| 2,4 a 3,7 | Orbe → pílula | O orbe vira **pílula "☾ 19 → 62 → 67"** com **arco de anel** que cresce; rótulo "Sleep" entra embaixo | U pílula (borda 1 px clara, vidro escuro); T rótulo; F glow no arco | Morph de forma (círculo → pílula), count-up com `softLand`; rótulo entra 4 a 6 f depois, com blur |
| 3,3 a 4,3 | Mais pílulas | Mais orbes cruzam o quadro e viram **pílulas "Focus" e "Rest"** (3→33→43, 8→31) | U 3 pílulas em linha; F rastro do orbe | Cascata de 3 a 5 f entre pílulas |
| 4,3 a 5,0 | Score | Pílulas descem e crescem; **"Score 29 ▲ → 47"** aparece acima, com **colchete que se desenha** ligando as 3 pílulas | T número grande + triângulo; U colchete (stroke animado); halo lilás no topo | Câmera sobe levemente; colchete usa `stroke-dashoffset` |
| 5,0 a 5,3 | Respiro | Tudo desfoca e some (blur forte) | F blur ~20 px | Saída acelerando |
| 5,3 a 6,3 | Ícone de app | Ícone aparece com **borda neon ciano/vermelha** (aberração), **linha branca vertical** (scan) cruza; ícone **desfoca** | W cinza-escuro; U ícone; F aberração cromática, scan | Rack focus (foco puxado para fora) |
| 6,3 a 7,3 | Bloqueio | **Cadeado aberto aparece e fecha** sobre o ícone; **glow vermelho** pulsa ao redor | U cadeado sólido branco; F glow vermelho radial pulsando (~12 a 18 f) | Micro-"clunk": escala 1 → 0,96 → 1 no instante do fechamento |
| 7,3 a 8,3 | Regras | UI "Blocked Apps / Unblock" + card "Rules ▸ Work Time / Block ♪" entra **inclinada** e endireita; recua | U 2 painéis de vidro; T títulos pequenos | Tilt → plano; zoom-out reduz tudo para o canto |
| 8,3 a 9,0 | CTA | Botão grande **"▶ Start"** (pílula de vidro com **luz roxa por baixo**) | U botão; F luz roxa no rodapé do botão | A UI vira o botão (match-cut de forma); botão encolhe |
| 9,0 a 10,5 | Logo | **Logo entra desfocado e ganha foco**, depois assenta; halo no topo | T/logo branco; W halo | Rack focus no logo |
| 10,3 a 12,0 | Fim | Logo some; **URL** pequena (cinza) fica ~1 s; tudo escurece para preto | T URL | Fade só aqui |

**O que copiar como técnica:** UI em perspectiva que endireita; orbe → pílula → ícone → botão → logo; count-up com arco; colchete desenhado; glow vermelho pulsante; rack focus no logo.

---

## REF B: Wearable/saúde, mundo branco (16:9, 14,4 s) → `frames/refB_*`

**Objeto-ponte:** o card "relógio" (cartão arredondado) que aparece, se multiplica, se transforma em foto/ícone.

| t (s) | Beat | O que acontece | Camadas | Câmera / transição |
|---|---|---|---|---|
| 0,0 a 0,3 | Vazio | Branco puro | W branco | início em repouso curto |
| 0,3 a 1,3 | Frase 1 | **"Your body is constantly"** monta por palavra/letra: letras com **onda vertical** antes de assentar | T preto 700; F blur 7 a 8 f | stagger 2 a 3 f |
| 1,3 a 2,3 | Troca de palavra | "constantly" **vira "changing."**: letras separam, deslocam, aparece **glow vermelho difuso** atrás; palavra final em vermelho | T com glitch de letras; F glow vermelho (radial) | morph de texto por troca de letras |
| 2,3 a 3,0 | Texto → objeto | Frase encolhe/desfoca para cima; **um cartão vermelho escuro desfocado sobe do centro** e ganha foco como card "Heartbeats ♥ 67 BPM" | U card preto com coração pulsando (anéis concêntricos); T "Heartbeats" com ponto verde | Rack focus no card; vem de baixo |
| 3,0 a 3,7 | 2º card | Pílula vermelha entra por baixo (anel de atividade), enquanto **card azul "Sleep Shifts 84" desliza** sobrepondo o 1º | U 2 cards com UI real (anéis); F blur direcional | Cascata + parallax; cards se afastam |
| 4,0 a 4,7 | 3º card | **Pílula vermelha vira o card "Activity"** (anéis neon) entre os dois; todos nítidos | U 3 cards em linha | Morph pílula → card |
| 4,7 a 5,7 | Escala | O card central **cresce**, os laterais encolhem; linha fina + **"tells a"** entra no topo-esq, **"story…"** no canto inferior-dir | T editorial com linhas finas; U cards | Zoom + texto em cantos opostos (diagonal) |
| 5,7 a 6,3 | Saída | Cards **encolhem e desfocam**; texto some | F blur | Saída acelerando |
| 6,3 a 7,7 | Colagem | **Anel de fotos** (12 a 15 retratos rotacionados) em fundo rosa claro ao redor do texto **"How do you see the bigger picture?"**; "the **bigger picture?**" ganha vermelho com glow; anel gira/reorganiza | W gradiente rosa; U fotos em anel; T com régua/colchetes finos | Entrada das fotos em cascata; rotação lenta |
| 7,7 a 8,3 | Saída da colagem | Colagem desce e desfoca, **linha vermelha** varre a borda | F blur, linha | Whip vertical |
| 8,3 a 8,7 | Paisagem | **Paisagem fotográfica** (montanhas/flores) com color-grade rosa saturado, **relógio 3D girando** e card de coração translúcido | W foto; U relógio 3D | Corte em movimento; grade de cor "dissolve" para natural |
| 8,7 a 10,0 | Cards de vidro | Cores naturais; 3 **cards de vidro (backdrop blur)** com UI real (coração, Sleep 84, Activity 7.842) entram e flutuam em **parallax** em volta do relógio | U glassmorphism com borda clara; F profundidade de campo (flores em primeiro plano desfocadas) | Leve dolly, parallax |
| 10,0 a 11,0 | Ícone | Cena vira **rosa-magenta vivo** com ícone branco arredondado (coração) | W gradiente magenta com mancha de luz | Corte por cor |
| 11,0 a 11,5 | Morph | O ícone **vira um retângulo largo branco** | U shape morph | Morph de forma |
| 11,5 a 14,4 | Fecho | Fundo branco: **"Listen to your body."**, "your body" em vermelho com glow crescente; depois assinatura pequena | T cinético + glow | Palavra a palavra, 2 a 3 f |

**Copiar:** troca de palavra com glitch de letras + glow; pílula → card; cards de vidro em parallax sobre foto real; anel de fotos em torno de frase; morph de ícone para retângulo; fecho tipográfico com glow crescente.

---

## REF C: Fintech, vertical (9:16, 10,5 s) → `frames/refC_*`

**Objeto-ponte:** o quadrado branco/pílula roxa que vira tela de app, depois botão, depois barra dentro do logo.

| t (s) | Beat | O que acontece | Camadas | Câmera / transição |
|---|---|---|---|---|
| 0,0 a 0,6 | Ícone semente | Fundo lilás claro; **ícone minúsculo** no centro cresce e fica "vidro" claro; fundo escurece para roxo | W gradiente claro → roxo profundo | Crescimento com `softLand` |
| 0,6 a 1,4 | Quadrado → tela | **Cartão branco com topo roxo** (tela de app) inclinado e com **brilho de borda** sobe e **cresce deformando** (warp) | U card 3D; F glow de borda; anel de toque no centro | `rotateZ` + `rotateX` que endireitam; morph de forma |
| 1,4 a 2,0 | Tela cheia | UI real ("Olá, Rafael", Conta R$ 1.976,65, ações Pix/Pagar/Caixinhas/Transferir) preenche o quadro | U app real | Chegada com blur direcional que assenta |
| 2,0 a 2,3 | Toque | **Anel de toque** em "Caixinhas": zoom no botão com blur do resto | F anel; rack focus | Push-in |
| 2,3 a 3,0 | Palavra | Fundo branco: **círculos translúcidos sobrepostos** (Venn desfocado) e a palavra **"Caixinha Nubank"** com a marca em roxo | T cinético; U círculos | Transição por forma (círculos viram texto) |
| 3,0 a 3,6 | Whoosh | Fundo lilás/escuro; **faixas roxas desfocadas** cruzam (blur direcional) | F motion blur forte | Whip |
| 3,6 a 5,0 | UI 3D | Tela "Total em investimentos / Investir" **inclinada em 3D**; abas e cards "Minha Carteira / Caixinhas / Caixinha Turbo" com botões "Começar/Conhecer/Criar" em fileira **curva**; camadas com paralaxe | U 4+ camadas de UI com profundidade; F glow nos botões | Câmera desliza/rotaciona; cards em arco |
| 5,0 a 5,4 | Zoom no botão | **Zoom no botão "Conhecer"** com stretch/blur; o resto desfoca | F blur | Push-in forte |
| 5,4 a 6,0 | Orbe | Tudo escurece; botão vira **pílula roxa → ponto roxo** | W quase-preto | Redução a uma forma |
| 6,0 a 6,6 | Frase | **Pílula com "O jeito certo de investir!"** brilha | U pílula, F halo rosa | A forma vira texto |
| 6,6 a 7,0 | Logo gigante | Câmera **entra no logo "nu" gigante** em perspectiva; a pílula vira **a barra dentro do logo** | U logo cinza enorme com blur | Push-in extremo; match-cut de forma |
| 7,0 a 7,7 | Flash branco | **Branco** com **ícone "nu" roxo 3D** que encolhe | W branco; U ícone | Corte em movimento (flash) |
| 7,7 a 10,5 | Assinatura | Wordmark **"NUKE Criativo"** emerge desfocado e ganha foco; **lupa** varre o texto (efeito de revelar) | T logo; U lupa vazada | Rack focus + máscara |

**Copiar:** forma → tela → botão → logo (match-cut contínuo); anel de toque; UI em arco 3D com paralaxe; zoom *dentro* do logo; flash branco → assinatura.

---

## REF D: Streaming, mesh gradient (16:9, 15,9 s) → `frames/refD_*`

**Objeto-ponte:** o mesh gradient verde (nunca para) + o widget de player que vira check.

| t (s) | Beat | O que acontece | Camadas | Câmera / transição |
|---|---|---|---|---|
| 0,0 a 0,3 | Mundo | **Mesh gradient** verde/preto em blobs (já em movimento) | W blobs desfocados | começa em movimento |
| 0,3 a 1,0 | Logo | Logo + wordmark; **últimas letras com fade/blur** ao entrar | T logo; letras escalonadas | stagger por letra |
| 1,0 a 2,3 | Marquee | **"Spotify ad made by Apple."**: a frase **desliza** da direita para a esquerda empurrando o logo; "Apple." em **outra fonte, verde mais claro** | T marquee com blur horizontal crescente | Whip horizontal |
| 2,3 a 2,7 | Saída | "Apple." sai com **blur direcional forte** | F motion blur | Saída acelerando |
| 2,7 a 3,7 | Frase 2 | **"Playlists Made For You"**: "You" aparece verde e vira branco; "Playlists" **cai para cinza**, "Made For You" fica **bold branco** | T com dim de contexto | Cascata + troca de peso |
| 3,7 a 5,0 | Cards | Fileira **"Made For You"** com 5 cards "Daily Mix 01 a 04" (capas reais, selo colorido); entra com blur, **desliza para a esquerda** e desfoca | U cards em fileira; W mesh escurece | Pan horizontal |
| 5,0 a 6,3 | Frase 3 | **"Discover new sounds"** entra com máscara por letras; some desfocando | T branco 700 | Rack de texto |
| 6,3 a 7,7 | Grid | **"Every week."** inclinada sobre um **grid de capas em perspectiva diagonal** que rola; "week" em verde claro; o grid acelera | W grid 3D; T texto inclinado; F vinheta | Texto rotaciona junto com o grid; câmera desliza na diagonal |
| 8,0 a 9,0 | Player | Grid desfoca/escurece; **widget de player inclinado** ("Pink + White", barra 2:03 → 2:12) **endireita** | U vidro escuro com borda; W mesh | Tilt → plano |
| 9,0 a 9,7 | Frase 4 | **"Collect what you love"** entra sobre o player ("you love" em itálico/cinza que clareia) | T 2 estilos na mesma frase | Cascata |
| 9,7 a 11,0 | Macro | **Zoom macro** nos controles (play, avançar, "+") com **motion blur**; câmera "viaja" pela barra até o **botão +** | U player gigante | Push-in contínuo (não é corte) |
| 11,0 a 11,7 | Confirmação | O **+ vira círculo verde com check** dentro de um **anel que fecha**; fundo some | U check + anel (stroke) | Morph + micro-pop (1 → 1,08 → 1) |
| 11,3 a 12,3 | Toast | Aparece o **toast "Added to Liked Songs. Change"** (pílula clara) | U toast | Sobe 20 px com `softLand` |
| 12,3 a 15,9 | Letras | **"Feel every word."** (cada palavra com cor própria) e **cartão de letras** com a linha atual em foco e as outras desfocadas; encerra | T + U cartão inclinado | Foco linha a linha |

**Copiar:** mesh gradient vivo contínuo; marquee com blur; dim de contexto; grid de capas diagonal em perspectiva; zoom macro contínuo até o botão; + → check com anel; toast; cartão de letras com foco por linha.

---

## Padrões transversais (checklist de "nível After Effects")

- ☐ Começa já em movimento; termina com fecho curto.
- ☐ Cada beat tem **mundo + UI + texto + FX**.
- ☐ Pelo menos um **morph de forma** (orbe/pílula/quadrado → UI/logo).
- ☐ Pelo menos um **zoom através do objeto** (macro) e um **rack focus**.
- ☐ Pelo menos um **texto que troca de palavra / marquee / dim de contexto**.
- ☐ Pelo menos um **momento de confirmação** (check/anel/toast/cadeado) com micro-pop.
- ☐ Texto-chave com **glow**; alerta com **pulso**.
- ☐ Fundo **vivo** (blobs/halo/grain), nunca chapado.
