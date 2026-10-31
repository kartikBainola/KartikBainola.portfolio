import type { Metadata } from "next";
import { SITE_CONFIG, absoluteUrl, pageUrl } from "./constants";

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(pageUrl("/")),
    title: {
      default: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      "Flutter Developer",
      "Mobile Application Engineer",
      "Dart Developer",
      "Cross-platform Development",
      "Android Developer",
      "iOS Developer",
      "Kartik Bainola",
      "Dehradun",
      "Flutter Web",
      "Mobile App Development",
    ],
    authors: [{ name: SITE_CONFIG.name, url: pageUrl("/") }],
    creator: SITE_CONFIG.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl("/"),
      title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: absoluteUrl(SITE_CONFIG.ogImage),
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
      description: SITE_CONFIG.description,
      images: [absoluteUrl(SITE_CONFIG.ogImage)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: pageUrl("/"),
    },
    ...overrides,
  };
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.title,
    url: pageUrl("/"),
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.linkedin.com/in/kartik-bainola",
      "https://github.com/kartikbainola",
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Mobile Application Development",
      "Cross-platform Development",
      "Firebase",
      "Clean Architecture",
    ],
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_CONFIG.name} Portfolio`,
    url: pageUrl("/"),
    description: SITE_CONFIG.description,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
  };
}
