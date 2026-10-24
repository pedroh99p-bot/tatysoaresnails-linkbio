export const assets = {
  "brand": {
    "gold": "/assets/brand/logo-gold.webp",
    "white": "/assets/brand/logo-white.png",
    "monogram": "/assets/brand/monogram-gold.png"
  },
  "profile": {
    "avatar": "/assets/profile/taty-avatar-real.webp",
    "original": "/assets/profile/taty-original-real.webp"
  },
  "backgrounds": {
    "main": "/assets/backgrounds/floral-champagne-mobile.webp",
    "subtle": "/assets/backgrounds/ivory-subtle.webp"
  },
  "pricing": {
    "reference": "/assets/pricing/tabela-original-referencia.webp"
  },
  "services": {
    "collage": "/assets/services/collage-trabalhos-reais.webp",
    "fibra": "/assets/services/fibra-de-vidro-real.webp",
    "acrigel": "/assets/services/acrigel-real.webp",
    "acrigelRed": "/assets/services/acrigel-vermelho-real.webp",
    "moldeF1LayoutReference": "/assets/services/molde-f1-referencia-real.webp"
  },
  "decor": {
    "ornament": "/assets/decor/ornament-gold.png"
  }
} as const;

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
