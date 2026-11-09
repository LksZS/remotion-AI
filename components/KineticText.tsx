import React from "react";
import {interpolate, useCurrentFrame} from "remotion";
import {ease, theme} from "./theme";

/**
 * Texto cinético por palavra: translateY + blur em cascata, palavra(s) destacada(s) com cor + glow,
 * e "dim de contexto" opcional (palavras anteriores caem para cinza quando a próxima entra).
 */
export const KineticText: React.FC<{
  words: string[];
  highlight?: number[]; // índices das palavras destacadas
  start?: number; // frame de início
  stagger?: number; // frames entre palavras (2 a 3)
  dur?: number; // frames de cada entrada (11 a 12)
  size?: number;
  weight?: number;
  color?: string;
  hiColor?: string;
  dimPrevious?: boolean;
  style?: React.CSSProperties;
}> = ({
  words,
  highlight = [],
  start = 0,
  stagger = 3,
  dur = 12,
  size = 96,
  weight = 700,
  color = theme.fg,
  hiColor = theme.alert,
  dimPrevious = false,
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: `0 ${size * 0.28}px`,
        fontFamily: theme.font,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "-0.03em",
        lineHeight: 1.05,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const t0 = start + i * stagger;
        const p = interpolate(frame, [t0, t0 + dur], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease.softLand,
        });
        const isHi = highlight.includes(i);
        const nextStart = start + (i + 1) * stagger;
        const dim = dimPrevious && !isHi && i < words.length - 1 ? interpolate(frame, [nextStart, nextStart + 10], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) : 0;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: interpolate(p, [0, 0.4, 1], [0, 1, 1]),
              transform: `translateY(${(1 - p) * 36}px)`,
              filter: p < 1 ? `blur(${(1 - p) * 12}px)` : undefined,
              color: isHi ? hiColor : dim > 0 ? `rgba(255,255,255,${1 - dim * 0.6})` : color,
              textShadow: isHi ? `0 0 ${24 * p}px ${hiColor}` : undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
