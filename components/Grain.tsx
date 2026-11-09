import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";

/** Grain + vinheta. Determinístico (seed troca por frame). Coloque por último. */
export const Grain: React.FC<{opacity?: number; vignette?: number}> = ({opacity = 0.06, vignette = 0.35}) => {
  const frame = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,${vignette}) 100%)`, pointerEvents: "none"}} />
      <AbsoluteFill style={{opacity, mixBlendMode: "overlay", pointerEvents: "none"}}>
        <svg width="100%" height="100%">
          <filter id="g">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 12} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#g)" />
        </svg>
      </AbsoluteFill>
    </>
  );
};
