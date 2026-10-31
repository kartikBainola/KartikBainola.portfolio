export const SITE_CONFIG = {
  name: "Kartik Bainola",
  title: "Flutter Engineer",
  description:
    "Kartik Bainola is a Flutter engineer building production Android and iOS applications. Selected work includes Ventuera, CAPTO, and My Professional Rewards.",
  url: "https://kartikbainola.github.io/KartikBainola.portfolio",
  email: "kartikbainola1303@gmail.com",
  phone: "+91 76689 34850",
  location: "Dehradun, Uttarakhand, India",
  freelanceUrl: "https://nexivosupertech.netlify.app/",
  resumeUrl: "/KartikBainola_2026_resume.pdf",
  ogImage: "/og-image.png",
} as const;

function encodePath(path: string): string {
  const prefixed = path.startsWith("/") ? path : `/${path}`;
  return prefixed
    .split("/")
    .map((segment) => {
      if (!segment) return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}

export function absoluteUrl(path = "/"): string {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${encodePath(path)}`;
}

export function pageUrl(path = "/"): string {
  const url = absoluteUrl(path);
  return url.endsWith("/") ? url : `${url}/`;
}

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/kartik-bainola",
  github: "https://github.com/kartikbainola",
  email: "mailto:kartikbainola1303@gmail.com",
  phone: "tel:+917668934850",
} as const;

export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Expertise", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;
