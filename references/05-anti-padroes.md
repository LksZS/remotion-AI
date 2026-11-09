# 05. Anti-padrões (slop / raso) e conserto

## A. O filme de um objeto só (o mais comum)
**Sintoma:** uma pílula/card que escala, gira e dá zoom por todo o filme; texto parado; legendas pequenas trocando embaixo; fundo liso; sem UI real; sem microinteração.
**Por que é raso:** só há 1 mundo, 1 camada útil e transformações básicas (`scale`/`rotate`). Não acontece nada *dentro* do objeto.
**Conserto:**
1. Quebre em **≥ 6 beats** com ações diferentes (revelar dado, count-up, toque, confirmação, frase, logo).
2. Dê ao objeto **conteúdo**: UI da marca em detalhe (listas, gráficos, botões, estados) que **anima por dentro** (barras crescem, números contam, itens entram em cascata).
3. Faça o objeto **virar outras coisas** (pílula → card → botão → logo): objeto-ponte.
4. Adicione **mundo vivo** (mesh/halo/grain) e **camadas em Z** com blur desigual.
5. Troque "legenda embaixo" por **texto cinético no quadro** (2 a 5 palavras, palavra-chave com glow).

## B. Slide que se mexe
Título à esquerda + card à direita parado; fades em tudo; contador "02/05"; rótulo no canto. → Texto vira o quadro; câmera se move; cena nasce da anterior.

## C. UI genérica
Card cinza "dashboard" com ponto de status, "Good morning", zinc. → Reconstrua a UI **real** da marca (prints, componentes, copy real) ou diga que falta o asset.

## D. Fade em tudo
Toda entrada por opacidade e toda cena termina em dissolve. → Entrar por transform (translate/scale/rotate) + blur; cortar em movimento; usar morph/zoom/whip para trocar de cena.

## E. Cor sem função
Gradiente decorativo, cor de marca espalhada. → Fundo contido; cor viva só no dado/ação/palavra-chave.

## F. Nascer do zero
Elementos que crescem de 0 → 1. → Entrar de ~3,5x desacelerando, ou da borda, ou de um orbe.

## G. Texto digitado letra a letra com cursor
→ Palavra a palavra com blur+translate, ou troca de palavra com glitch de letras.

## H. Frame morto / fim longo
→ Drift de luz, parallax, respiração de escala em segurados; fim ≤ 1,6 s.

## I. "Ficou ótimo!"
→ Mostre os números dos gates, descreva beat a beat e diga o que ainda melhoraria.

---

## Pergunte-se antes de entregar
1. Se eu cobrir o logo, ainda parece essa marca?
2. Consigo descrever 6 beats diferentes em uma linha cada?
3. Há algo acontecendo *dentro* do objeto (não só o objeto se movendo)?
4. Cada transição "compra" algo?
5. A câmera nunca para de contar a história?
