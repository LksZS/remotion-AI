import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {ease, theme} from "./theme";

/**
 * Pílula com ícone + número em count-up + arco de progresso. Rótulo entra depois, com blur.
 */
export const RingCounter: React.FC<{
  to: number;
  max?: number;
  start?: number;
  dur?: number;
  label?: string;
  icon?: React.ReactNode;
  width?: number;
  height?: number;
  accent?: string;
}> = ({to, max = 100, start = 0, dur = 24, label, icon, width = 300, height = 110, accent = "#D8D0FF"}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.softLand,
  });
  const value = Math.round(to * p);
  const r = height / 2 - 6;
  const perim = 2 * (width - height) + 2 * Math.PI * r; // aproximação do perímetro da pílula
  const arc = (to / max) * p * perim;
  const labelP = interpolate(frame, [start + 8, start + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease.softLand,
  });
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 16, fontFamily: theme.font}}>
      <div style={{position: "relative", width, height}}>
        <svg width={width} height={height} style={{position: "absolute", inset: 0, overflow: "visible"}}>
          <rect x={3} y={3} width={width - 6} height={height - 6} rx={(height - 6) / 2} fill="rgba(20,18,30,0.8)" stroke="rgba(255,255,255,0.18)" strokeWidth={2} />
          <rect
            x={3}
            y={3}
            width={width - 6}
            height={height - 6}
            rx={(height - 6) / 2}
            fill="none"
            stroke={accent}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${perim}`}
            style={{filter: `drop-shadow(0 0 10px ${accent})`}}
          />
        </svg>
        <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 18, color: "#fff", fontSize: height * 0.42, fontWeight: 600}}>
          {icon}
          <span style={{fontVariantNumeric: "tabular-nums"}}>{value}</span>
        </div>
      </div>
      {label ? (
        <div style={{color: "rgba(255,255,255,0.85)", fontSize: height * 0.26, opacity: labelP, filter: `blur(${(1 - labelP) * 8}px)`}}>{label}</div>
      ) : null}
    </div>
  );
};
