import type { Stat, TimelineItem } from "@/types";

export const profile = {
  name: "Kartik Bainola",
  title: "Mobile Application Developer",
  subtitle: "Flutter · Android · iOS · Flutter Web",
  location: "Dehradun, Uttarakhand, India",
  summary:
    "Mobile Application Developer with 3+ years of experience specializing in Flutter, Android, iOS, and Flutter Web development, delivering scalable and user-centric applications.",
  heroDescription:
    "I build, publish, and maintain production-ready mobile applications — from enterprise platforms to consumer apps on Google Play Store and Apple App Store. Skilled in clean architecture, AI-assisted development, and performance optimization.",
  about: `I'm a Mobile Application Developer based in Dehradun, India, with 3+ years of hands-on experience building cross-platform applications using Flutter and Dart.

Currently at Mindrops Solution Pvt Ltd, I publish and maintain production apps for Android and iOS — working across state management, animations, deep links, native integrations, and app store releases.

My work spans education platforms, enterprise rewards systems, AI-powered finance tools, logistics apps, and e-commerce solutions. I focus on responsive UI, REST API integration, Firebase, and delivering high-quality releases on schedule.`,
  industries: [
    "Education",
    "Finance & AI",
    "E-Commerce",
    "Enterprise & Rewards",
    "Logistics",
    "Warehousing",
  ],
};

export const stats: Stat[] = [
  { label: "Apps Published", value: 7, suffix: "+" },
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Companies", value: 4, suffix: "" },
  { label: "CGPA", value: 7.85, suffix: "" },
];

export const aboutTimeline: TimelineItem[] = [
  {
    year: "2023",
    title: "B.Tech in Computer Science",
    description:
      "Graduated from Graphic Era (Deemed to be) University with 7.85 CGPA. Built cross-platform mobile apps using Flutter and Firebase as academic projects.",
  },
  {
    year: "2024",
    title: "Professional Flutter Development",
    description:
      "Joined Save Efforts LLC, ResoluteAI, and ValueVertex — building responsive UIs, hybrid database apps, and performance-optimized Flutter applications.",
  },
  {
    year: "2025",
    title: "Mindrops — Mobile App Developer",
    description:
      "Joined Mindrops Solution Pvt Ltd in Delhi. Published multiple apps on Android and iOS, built face recognition and e-commerce applications.",
  },
  {
    year: "2026",
    title: "Production App Specialist",
    description:
      "Leading development on Ventuera, CAPTO, My Professional Rewards, and enterprise apps — from feature development to Play Store and App Store releases.",
  },
];

export const whyChooseMe = [
  {
    title: "Production Experience",
    description:
      "Published apps on Google Play Store and Apple App Store — Ventuera, CAPTO, My Professional Rewards, and more.",
    icon: "rocket",
  },
  {
    title: "Clean Architecture",
    description:
      "Scalable, maintainable codebases with feature-first structure, Riverpod/Bloc state management, and SOLID principles.",
    icon: "layers",
  },
  {
    title: "Pixel Perfect UI",
    description:
      "Responsive, animated interfaces with seamless UI/UX optimization across Android, iOS, and Flutter Web.",
    icon: "palette",
  },
  {
    title: "AI-Assisted Development",
    description:
      "Leveraging AI-assisted workflows to streamline development while maintaining high-quality, production-ready code.",
    icon: "trending-up",
  },
  {
    title: "Timely Delivery",
    description:
      "Consistent track record of delivering projects on schedule — solving technical challenges efficiently under deadlines.",
    icon: "clock",
  },
  {
    title: "End-to-End Ownership",
    description:
      "From UI design and API integration to app store publishing, performance optimization, and post-launch maintenance.",
    icon: "shield",
  },
];
