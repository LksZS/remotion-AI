import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {noise2D} from "@remotion/noise";

/**
 * Mesh gradient vivo: blobs desfocados que derivam por ruído (determinístico).
 * Troque as cores ao longo do filme usando `colors` (ex.: via interpolateColors fora daqui).
 */
export const MeshGradient: React.FC<{
  base?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
  seed?: string;
}> = ({base = "#0A0A0C", colors = ["#10E24A", "#0A8F2E", "#10E24A", "#052a12"], speed = 0.012, blur = 110, seed = "mesh"}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: base, overflow: "hidden"}}>
      {colors.map((c, i) => {
        const nx = noise2D(`${seed}-x${i}`, frame * speed, i * 3.1);
        const ny = noise2D(`${seed}-y${i}`, frame * speed, i * 5.7);
        const size = Math.max(width, height) * (0.55 + 0.15 * ((i % 3) / 2));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: width * (0.5 + nx * 0.55) - size / 2,
              top: height * (0.5 + ny * 0.55) - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${c} 0%, transparent 68%)`,
              filter: `blur(${blur}px)`,
              opacity: 0.9,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
