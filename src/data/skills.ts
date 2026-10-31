import type { Skill, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  "Mobile Development",
  "Architecture and State Management",
  "Backend and Integrations",
  "Development and Delivery",
];

export const skillCategoryNotes: Record<SkillCategory, string> = {
  "Mobile Development":
    "Flutter and Dart for the Android and iOS apps listed on this site, including store releases.",
  "Architecture and State Management":
    "Structure and state used on shipped apps: Clean Architecture, Riverpod, and Bloc.",
  "Backend and Integrations":
    "Services wired into those products — APIs, Firebase, auth, notifications, payments, and local storage.",
  "Development and Delivery":
    "Version control, store releases, and performance work named in the employment records.",
};

export const skills: Skill[] = [
  {
    name: "Flutter",
    icon: "smartphone",
    category: "Mobile Development",
    detail: "Used on every listed app, from Ventuera through Footprint Warehousing.",
  },
  {
    name: "Dart",
    icon: "code",
    category: "Mobile Development",
    detail: "The language for those Flutter codebases.",
  },
  {
    name: "Android",
    icon: "android",
    category: "Mobile Development",
    detail: "Play Store releases are part of the Mindrops role.",
  },
  {
    name: "iOS",
    icon: "apple",
    category: "Mobile Development",
    detail: "App Store releases are part of the same publishing work.",
  },
  {
    name: "Flutter Web",
    icon: "globe",
    category: "Mobile Development",
    detail: "Named in the public stack with Android and iOS.",
  },

  {
    name: "Clean Architecture",
    icon: "layers",
    category: "Architecture and State Management",
    detail: "Recorded on CAPTO.",
  },
  {
    name: "Riverpod",
    icon: "zap",
    category: "Architecture and State Management",
    detail: "Ventuera, VRV Hospitality, Footprint Warehousing, plus Mindrops and ResoluteAI.",
  },
  {
    name: "Bloc",
    icon: "blocks",
    category: "Architecture and State Management",
    detail: "My Professional Rewards, and the ResoluteAI role.",
  },

  {
    name: "Firebase",
    icon: "flame",
    category: "Backend and Integrations",
    detail: "Ventuera, CAPTO, and Sardar — A Pure Meat Shop, and the Mindrops, ValueVertex, and ResoluteAI roles.",
  },
  {
    name: "REST APIs",
    icon: "api",
    category: "Backend and Integrations",
    detail: "Integrated on every project listed here.",
  },
  {
    name: "Authentication",
    icon: "key",
    category: "Backend and Integrations",
    detail: "ResoluteAI role, and OTP auth on Expense Management.",
  },
  {
    name: "Push Notifications",
    icon: "bell",
    category: "Backend and Integrations",
    detail: "Ventuera, My Professional Rewards, and the ResoluteAI role.",
  },
  {
    name: "Payment Gateway",
    icon: "credit-card",
    category: "Backend and Integrations",
    detail: "Listed on Sardar — A Pure Meat Shop.",
  },
  {
    name: "SQLite",
    icon: "database",
    category: "Backend and Integrations",
    detail: "Save Efforts hybrid database work, and Expense Management.",
  },

  {
    name: "Git",
    icon: "git-branch",
    category: "Development and Delivery",
    detail: "Named on the ValueVertex and Save Efforts records.",
  },
  {
    name: "CI/CD",
    icon: "workflow",
    category: "Development and Delivery",
    detail: "Listed with Git and the Play Store and App Store release work.",
  },
  {
    name: "Google Play",
    icon: "play",
    category: "Development and Delivery",
    detail: "Store releases managed in the Mindrops role.",
  },
  {
    name: "App Store",
    icon: "store",
    category: "Development and Delivery",
    detail: "iOS releases managed alongside those Play Store releases.",
  },
  {
    name: "Performance Optimization",
    icon: "gauge",
    category: "Development and Delivery",
    detail: "Named in the Mindrops and ResoluteAI roles. No measured figures are published here.",
  },
];
