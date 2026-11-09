import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {ease} from "./theme";

/** Anel de toque: expande e some. Dispare a reação da UI 2 a 3 frames depois de `at`. */
export const CursorTap: React.FC<{x: number; y: number; at: number; size?: number; color?: string}> = ({x, y, at, size = 90, color = "rgba(255,255,255,0.9)"}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.softLand});
  if (frame < at || p >= 1) return null;
  const s = 0.6 + p * 0.9;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        border: `3px solid ${color}`,
        transform: `scale(${s})`,
        opacity: 1 - p,
        boxShadow: `0 0 24px ${color}`,
      }}
    />
  );
};
