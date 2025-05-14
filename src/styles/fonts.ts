import { Noto_Sans_JP } from "next/font/google";

export const notoSansJPFont = Noto_Sans_JP({
  weight: "variable",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-noto-sans-jp",
});
