import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {ease} from "./theme";

export type CamKey = {
  f: number; // frame
  x?: number; y?: number; z?: number; // px
  rx?: number; ry?: number; rz?: number; // graus
  s?: number; // escala
};

type Prop = "x" | "y" | "z" | "rx" | "ry" | "rz" | "s";

/**
 * Câmera 3D contínua. Anima o "mundo" por keyframes (easing aplicado a cada segmento).
 * Coloque DepthLayer dentro dela para ter profundidade real.
 */
export const Camera: React.FC<{
  keys: CamKey[];
  perspective?: number;
  easing?: (t: number) => number;
  children: React.ReactNode;
}> = ({keys, perspective = 1400, easing = ease.inOut, children}) => {
  const frame = useCurrentFrame();
  const frames = keys.map((k) => k.f);
  const v = (p: Prop, d: number) =>
    keys.length === 1
      ? (keys[0][p] ?? d)
      : interpolate(frame, frames, keys.map((k) => k[p] ?? d), {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing,
        });
  return (
    <AbsoluteFill style={{perspective, perspectiveOrigin: "50% 50%"}}>
      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transform: `translate3d(${v("x", 0)}px, ${v("y", 0)}px, ${v("z", 0)}px) rotateX(${v("rx", 0)}deg) rotateY(${v("ry", 0)}deg) rotateZ(${v("rz", 0)}deg) scale(${v("s", 1)})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
