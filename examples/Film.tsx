/**
 * ESQUELETO de filme (12 s @30fps, 1920x1080) mostrando COMO compor os componentes.
 * NÃO é o resultado final: troque pelo storyboard aprovado e pelos assets reais da marca.
 * Padrão: um <Sequence> por beat, mundo vivo contínuo por baixo, objeto-ponte atravessando beats.
 */
import React from "react";
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from "remotion";
import {
  Camera, DepthLayer, KineticText, RingCounter, GlassCard, MeshGradient,
  ShapeMorph, CursorTap, Grain, ease, theme, sec,
} from "../components";

const World: React.FC = () => (
  // Mundo vivo contínuo: nunca fundo chapado.
  <MeshGradient base={theme.bg} colors={[theme.brand, "#3a0a52", theme.brandSoft, "#14051f"]} />
);

/** BEAT 1 (0 a 1.5 s): UI em perspectiva que endireita + barra destaque */
const Beat1: React.FC = () => (
  <Camera keys={[{f: 0, rx: 62, y: 160, s: 1.1}, {f: sec(1.2), rx: 0, y: 0, s: 1}]}>
    <DepthLayer z={0} focusKeys={[{f: 0, z: 0}]}>
      <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
        <GlassCard width={1100} height={560} tint="rgba(18,18,24,0.7)" />
      </AbsoluteFill>
    </DepthLayer>
  </Camera>
);

/** BEAT 2 (1.5 a 4 s): orbe → 3 pílulas com count-up em cascata */
const Beat2: React.FC = () => (
  <AbsoluteFill style={{alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 70}}>
    <RingCounter to={67} start={0} label="Sleep" />
    <RingCounter to={43} start={4} label="Focus" />
    <RingCounter to={31} start={8} label="Rest" />
  </AbsoluteFill>
);

/** BEAT 3 (4 a 6.5 s): texto cinético com palavra-chave e glow */
const Beat3: React.FC = () => (
  <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
    <KineticText words={["Seu", "foco,", "no", "controle."]} highlight={[3]} hiColor={theme.brandSoft} size={120} />
  </AbsoluteFill>
);

/** BEAT 4 (6.5 a 10 s): pílula vira card (morph) + toque */
const Beat4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ShapeMorph
        from={{x: 960, y: 540, w: 360, h: 110, r: 55}}
        to={{x: 960, y: 540, w: 900, h: 600, r: 56}}
        start={6}
        dur={16}
        background="rgba(255,255,255,0.96)"
        glow={theme.brandSoft}
      />
      <CursorTap x={960} y={760} at={30} />
      <div style={{position: "absolute", left: 0, right: 0, bottom: 120, textAlign: "center", color: "#fff", fontFamily: theme.font, fontSize: 48, opacity: interpolate(frame, [34, 46], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>
        Tudo em um toque
      </div>
    </AbsoluteFill>
  );
};

/** BEAT 5 (10 a 12 s): logo entra de ~3.5x desacelerando e assenta menor */
const Beat5: React.FC = () => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, 14], [3.5, 1], {extrapolateRight: "clamp", easing: ease.softLand});
  const blur = interpolate(frame, [0, 14], [18, 0], {extrapolateRight: "clamp"});
  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{fontFamily: theme.font, fontSize: 150, fontWeight: 700, color: "#fff", transform: `scale(${s})`, filter: `blur(${blur}px)`}}>
        SUA MARCA
      </div>
    </AbsoluteFill>
  );
};

export const Film: React.FC = () => (
  <AbsoluteFill style={{background: theme.bg}}>
    <World />
    <Sequence from={0} durationInFrames={sec(1.6)}><Beat1 /></Sequence>
    <Sequence from={sec(1.5)} durationInFrames={sec(2.6)}><Beat2 /></Sequence>
    <Sequence from={sec(4)} durationInFrames={sec(2.6)}><Beat3 /></Sequence>
    <Sequence from={sec(6.5)} durationInFrames={sec(3.6)}><Beat4 /></Sequence>
    <Sequence from={sec(10)} durationInFrames={sec(2)}><Beat5 /></Sequence>
    <Grain />
  </AbsoluteFill>
);
