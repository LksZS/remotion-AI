import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {ease} from "./theme";

export type Box = {x: number; y: number; w: number; h: number; r: number; rot?: number};

/**
 * Container que morfa de uma caixa A para uma caixa B (posição, tamanho, raio, rotação).
 * Use `children` com clip/máscara para revelar o conteúdo (UI) enquanto cresce.
 */
export const ShapeMorph: React.FC<{
  from: Box;
  to: Box;
  start: number;
  dur?: number;
  background?: string;
  glow?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({from, to, start, dur = 14, background = "#fff", glow, style, children}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.softLand,
  });
  const m = (a: number, b: number) => a + (b - a) * p;
  return (
    <div
      style={{
        position: "absolute",
        left: m(from.x, to.x),
        top: m(from.y, to.y),
        width: m(from.w, to.w),
        height: m(from.h, to.h),
        borderRadius: m(from.r, to.r),
        transform: `translate(-50%, -50%) rotate(${m(from.rot ?? 0, to.rot ?? 0)}deg)`,
        background,
        boxShadow: glow ? `0 0 60px ${glow}` : undefined,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
