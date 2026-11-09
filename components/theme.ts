import {Easing} from "remotion";

export const FPS = 30;

/** Easings iniciais. Calibre pelo olho no render. */
export const ease = {
  softLand: Easing.bezier(0.16, 1, 0.3, 1),
  snapSettle: Easing.bezier(0.2, 0.9, 0.25, 1),
  accelExit: Easing.bezier(0.55, 0, 0.9, 0.45),
  lateLean: Easing.bezier(0.3, 0, 0.2, 1.06),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
};

/** Tokens do filme. Troque pelos da marca. */
export const theme = {
  bg: "#0A0A0C",
  fg: "#FFFFFF",
  muted: "rgba(255,255,255,0.45)",
  brand: "#8A05BE",
  brandSoft: "#C77DFF",
  alert: "#FF2D3D",
  font: `"Inter", "Helvetica Neue", Arial, sans-serif`,
};

/** Frames a partir de segundos. */
export const sec = (s: number) => Math.round(s * FPS);
