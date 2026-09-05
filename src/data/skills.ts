import type { Skill, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  "Mobile Development",
  "Backend",
  "State Management",
  "Deployment",
  "Tools",
  "Cloud",
  "Architecture",
];

export const skills: Skill[] = [
  { name: "Flutter", icon: "smartphone", category: "Mobile Development" },
  { name: "Dart", icon: "code", category: "Mobile Development" },
  { name: "Android", icon: "android", category: "Mobile Development" },
  { name: "iOS", icon: "apple", category: "Mobile Development" },
  { name: "Flutter Web", icon: "globe", category: "Mobile Development" },
  { name: "Responsive UI", icon: "layout", category: "Mobile Development" },

  { name: "Flutter Flame", icon: "zap", category: "Mobile Development" },
  { name: "Deep Linking", icon: "link", category: "Mobile Development" },
  { name: "Face Recognition", icon: "shield", category: "Mobile Development" },

  { name: "REST APIs", icon: "api", category: "Backend" },
  { name: "SQLite", icon: "database", category: "Backend" },
  { name: "Hive", icon: "box", category: "Backend" },

  { name: "Riverpod", icon: "zap", category: "State Management" },
  { name: "Bloc", icon: "blocks", category: "State Management" },

  { name: "Play Store", icon: "play", category: "Deployment" },
  { name: "App Store", icon: "store", category: "Deployment" },
  { name: "CI/CD", icon: "workflow", category: "Deployment" },

  { name: "Git", icon: "git-branch", category: "Tools" },
  { name: "GitHub", icon: "github", category: "Tools" },
  { name: "VS Code", icon: "terminal", category: "Tools" },
  { name: "AI-Assisted Dev", icon: "code", category: "Tools" },

  { name: "Firebase", icon: "flame", category: "Cloud" },
  { name: "Firestore", icon: "cloud", category: "Cloud" },
  { name: "Cloud Functions", icon: "function", category: "Cloud" },
  { name: "Push Notifications", icon: "bell", category: "Cloud" },
  { name: "Authentication", icon: "key", category: "Cloud" },

  { name: "Clean Architecture", icon: "layers", category: "Architecture" },
  { name: "SOLID Principles", icon: "shield", category: "Architecture" },
  { name: "Performance Optimization", icon: "gauge", category: "Architecture" },
  { name: "Payment Gateway", icon: "credit-card", category: "Architecture" },
  { name: "Google Maps", icon: "map", category: "Architecture" },
];
