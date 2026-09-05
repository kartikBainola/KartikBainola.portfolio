export interface HeroApp {
  id: string;
  title: string;
  stack: string;
  video: string;
  poster?: string;
  href?: string;
}

export const heroApps: HeroApp[] = [
  {
    id: "ventuera",
    title: "Ventuera",
    stack: "Flutter · Dart · Riverpod",
    video: "videos/ventuera.webm",
    poster: "images/projects/ventuera-promo-1.png",
    href: "/projects/ventuera",
  },
  {
    id: "capto",
    title: "CAPTO",
    stack: "Flutter · Dart · AI/OCR",
    video: "videos/capto.webm",
    poster: "images/projects/capto-screenshot-2.png",
    href: "/projects/capto",
  },
  {
    id: "my-professional-rewards",
    title: "My Professional Rewards",
    stack: "Flutter · Dart · REST API",
    video: "videos/myprofessionalrewards.webm",
    poster: "images/projects/my-professional-rewards-promo-1.png",
    href: "/projects/my-professional-rewards",
  },
  {
    id: "petinfy",
    title: "PetInfy",
    stack: "Flutter · Dart",
    video: "videos/petInfy.webm",
  },
  {
    id: "pns",
    title: "PNS",
    stack: "Flutter · Dart",
    video: "videos/pns.webm",
  },
];

export const HERO_CAROUSEL_START_INDEX = 1;
