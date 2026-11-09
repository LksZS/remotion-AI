import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {ease} from "./theme";

/**
 * Camada em profundidade com desfoque proporcional à distância do foco (rack focus).
 * focusKeys: [{f, z}] anima o plano de foco no tempo.
 */
export const DepthLayer: React.FC<{
  z: number;
  focusKeys: {f: number; z: number}[];
  blurPerPx?: number; // px de blur por px de distância
  maxBlur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({z, focusKeys, blurPerPx = 0.02, maxBlur = 24, style, children}) => {
  const frame = useCurrentFrame();
  const focusZ =
    focusKeys.length === 1
      ? focusKeys[0].z
      : interpolate(frame, focusKeys.map((k) => k.f), focusKeys.map((k) => k.z), {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease.inOut,
        });
  const blur = Math.min(maxBlur, Math.abs(z - focusZ) * blurPerPx);
  return (
    <AbsoluteFill
      style={{
        transform: `translateZ(${z}px)`,
        filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
