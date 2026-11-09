import React from "react";

/** Card de vidro: blur do fundo, borda fina, reflexo e sombra. */
export const GlassCard: React.FC<{
  width: number;
  height: number;
  radius?: number;
  tint?: string; // ex.: "rgba(255,255,255,0.12)" (claro) ou "rgba(18,18,24,0.7)" (escuro)
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({width, height, radius = 36, tint = "rgba(255,255,255,0.12)", style, children}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background: `linear-gradient(145deg, rgba(255,255,255,0.22), ${tint} 40%, rgba(255,255,255,0.04))`,
      backdropFilter: "blur(24px) saturate(140%)",
      WebkitBackdropFilter: "blur(24px) saturate(140%)",
      border: "1px solid rgba(255,255,255,0.28)",
      boxShadow: "0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);
