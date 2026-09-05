export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  featured: boolean;
  technologies: string[];
  features: string[];
  image: string;
  icon?: string;
  logoBackground?: string;
  screenshots?: string[];
  screenshotStyle?: "device" | "poster";
  mockup?: string;
  playStore?: string;
  appStore?: string;
  website?: string;
  github?: string;
  role?: string;
  architecture?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  demoVideo?: string;
  color: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export type SkillCategory =
  | "Mobile Development"
  | "Backend"
  | "State Management"
  | "Deployment"
  | "Tools"
  | "Cloud"
  | "Architecture";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  image?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}
