import type { Project } from "@/types";

export interface CaseBlock {
  title: string;
  paragraphs: string[];
  items?: string[];
  pending?: string;
}

const ventuera: CaseBlock[] = [
  {
    title: "Product Overview",
    paragraphs: [
      "Ventuera connects students and companies through tasks, projects, research and development, events, courses, and hiring. Student profiles and portfolios are part of the product.",
      "The app is published on Google Play and the App Store.",
    ],
  },
  {
    title: "Problem and Requirements",
    paragraphs: [
      "The product is built around student and company workflows: tasks, projects, research work, events, courses, hiring, and profiles. A separate requirements brief is not included on this page.",
    ],
    pending: "A separate requirements brief is not included on this page.",
  },
  {
    title: "My Role and Responsibilities",
    paragraphs: [
      "I developed and maintained the Flutter application: responsive UI, REST API integration, Firebase, Riverpod, performance optimization, and releases for Android and iOS.",
      "This page does not separate that work from tasks handled by other people on the product.",
    ],
    pending: "A screen-by-screen list of what I personally implemented is not included.",
  },
  {
    title: "Technology Stack",
    paragraphs: [
      "Flutter, Dart, Riverpod, REST APIs, Firebase, and push notifications.",
    ],
  },
  {
    title: "Architecture and Implementation",
    paragraphs: [
      "Riverpod handles state. REST APIs and Firebase cover the integrations. A module map of the codebase is not included here.",
    ],
    items: [
      "Task marketplace",
      "Project and R&D collaboration",
      "Events and workshops",
      "Courses and certifications",
      "Hiring and recruitment",
      "Student profiles and portfolios",
    ],
    pending: "Package structure is not included.",
  },
  {
    title: "Engineering Challenges",
    paragraphs: [],
    pending: "Individual engineering challenges are not listed for Ventuera.",
  },
  {
    title: "Solutions Implemented",
    paragraphs: [
      "The implemented work covers responsive UI, API integration, Firebase, Riverpod, performance optimization, and store releases.",
    ],
    pending: "Solutions are not tied to individual problems on this page.",
  },
  {
    title: "Performance and Reliability Improvements",
    paragraphs: [
      "Performance optimization was part of the work. Measurements, crash figures, and before-and-after comparisons are not included.",
    ],
    pending: "Measured performance results are not included.",
  },
  {
    title: "Verified Results",
    paragraphs: [
      "The app is published on Google Play as com.ventuera.app and on the App Store as Ventuera (id 6759637564). Usage, ratings, and revenue are not listed here.",
    ],
  },
];

const capto: CaseBlock[] = [
  {
    title: "Product Overview",
    paragraphs: [
      "CAPTO is a document workflow application for extracting data from receipts, bank statements, and business documents. The product includes OCR extraction, document scanning and upload, review and validation, role-based access, dark and light themes, and multi-format export.",
    ],
  },
  {
    title: "Problem and Requirements",
    paragraphs: [
      "The product is described as secure, fast, and accurate extraction from business documents. Scanning limits, credit rules, and extraction accuracy are not stated here.",
    ],
    pending: "Add verified requirements such as capture flow, file types, or usage limits if you worked on them.",
  },
  {
    title: "My Role and Responsibilities",
    paragraphs: [
      "I contributed to the Flutter application with new features, third-party integrations, performance optimization, and Android and iOS releases. This was not sole ownership of the product.",
    ],
    pending: "Name the features you implemented so this does not read as ownership of the whole product.",
  },
  {
    title: "Technology Stack",
    paragraphs: [
      "Flutter, Dart, AI/OCR, REST APIs, Firebase, and clean architecture.",
    ],
  },
  {
    title: "Architecture and Implementation",
    paragraphs: [
      "The app uses clean architecture, REST APIs, and Firebase. Folders, repositories, and the extraction-service call are not described here.",
    ],
    pending: "Add the implementation you can actually describe, such as the upload flow or the API boundary.",
  },
  {
    title: "Engineering Challenges",
    paragraphs: [],
    pending: "Individual engineering challenges are not listed for CAPTO.",
  },
  {
    title: "Solutions Implemented",
    paragraphs: [
      "The contribution covers feature development, third-party integration, and release work. Individual solutions are not broken out.",
    ],
    pending: "Add solutions only for work you did.",
  },
  {
    title: "Performance and Reliability Improvements",
    paragraphs: [
      "Performance optimization was part of the contribution. Timings, memory figures, and reliability metrics are not included.",
    ],
    pending: "Add measured results if you have them from release work.",
  },
  {
    title: "Verified Results",
    paragraphs: [
      "Google Play lists the app as uk.cloud.capto. The Apple link currently opens an App Store search for Capto, not a direct listing.",
    ],
    pending: "Replace the App Store search with a direct listing URL if one exists.",
  },
];

const rewards: CaseBlock[] = [
  {
    title: "Product Overview",
    paragraphs: [
      "My Professional Rewards is an enterprise rewards application for Unilever Food Solutions. Catering businesses scan trade invoices, earn points, and redeem high-street e-vouchers.",
      "Product areas include invoice scanning, points and rewards, wholesaler profiles, e-voucher redemption, business registration, and product eligibility detection.",
    ],
  },
  {
    title: "Problem and Requirements",
    paragraphs: [
      "Catering businesses scan trade invoices, earn points, and redeem e-vouchers. A formal requirements list is not included on this page.",
    ],
    pending: "Add the requirements you were given, if you can share them.",
  },
  {
    title: "My Role and Responsibilities",
    paragraphs: [
      "I built and maintained the Flutter application: secure authentication, responsive UI, backend API integration, bug fixes, and performance enhancements.",
      "Not every product feature is assigned to one person on this page.",
    ],
    pending: "Add the workflows you owned, such as authentication, scanning, or notifications, only where that is accurate.",
  },
  {
    title: "Technology Stack",
    paragraphs: [
      "Flutter, Dart, REST APIs, camera and scanning, Bloc, and push notifications.",
    ],
  },
  {
    title: "Architecture and Implementation",
    paragraphs: [
      "Bloc handles state, with REST APIs and camera-based scanning. An architecture diagram is not included.",
    ],
    pending: "Add the module layout or API flow if you want this section to go beyond the stack list.",
  },
  {
    title: "Engineering Challenges",
    paragraphs: [],
    pending: "Individual engineering challenges are not listed for My Professional Rewards.",
  },
  {
    title: "Solutions Implemented",
    paragraphs: [
      "The work covers authentication, API integration, bug fixes, and performance improvements. Step-by-step implementations are not included.",
    ],
    pending: "Add specific fixes only when you can describe what broke and what you changed.",
  },
  {
    title: "Performance and Reliability Improvements",
    paragraphs: [
      "Performance enhancements and bug fixes were part of the work. Quantitative results are not included.",
    ],
    pending: "Add verified improvements if you measured them.",
  },
  {
    title: "Verified Results",
    paragraphs: [
      "The app is listed on Google Play as uk.grgprofessionalservices.grg and on the App Store as My Professional Rewards (id 1642677139). Download, rating, and business metrics are not included.",
    ],
  },
];

const featured: Record<string, CaseBlock[]> = {
  ventuera,
  capto,
  "my-professional-rewards": rewards,
};

function fallbackBlocks(project: Project): CaseBlock[] {
  return [
    {
      title: "Product Overview",
      paragraphs: [project.description, project.longDescription].filter(Boolean),
    },
    {
      title: "Problem and Requirements",
      paragraphs: [],
      pending: "A problem statement is not included for this project.",
    },
    {
      title: "My Role and Responsibilities",
      paragraphs: project.role ? [project.role] : [project.longDescription],
    },
    {
      title: "Technology Stack",
      paragraphs: ["Technologies:"],
      items: project.technologies,
    },
    {
      title: "Architecture and Implementation",
      paragraphs: project.architecture?.length
        ? ["Structure:"]
        : ["An architecture description is not included."],
      items: project.architecture,
      pending: project.architecture?.length
        ? undefined
        : "Add architecture notes only if they describe this codebase.",
    },
    {
      title: "Engineering Challenges",
      paragraphs: [],
      items: project.challenges,
      pending: project.challenges?.length
        ? undefined
        : "Individual engineering challenges are not listed.",
    },
    {
      title: "Solutions Implemented",
      paragraphs: [],
      items: project.solutions,
      pending: project.solutions?.length ? undefined : "Solutions are not listed separately from the description.",
    },
    {
      title: "Performance and Reliability Improvements",
      paragraphs: [],
      pending: "Performance or reliability measurements are not included.",
    },
    {
      title: "Verified Results",
      paragraphs: project.results?.length
        ? []
        : ["Store links are shown when a listing URL is available. Other results are not included."],
      items: project.results,
    },
  ];
}

export function getCaseBlocks(project: Project): CaseBlock[] {
  return featured[project.id] ?? fallbackBlocks(project);
}

export const contributions: Record<string, string> = {
  ventuera:
    "Flutter development and maintenance, including responsive UI, Riverpod, REST APIs, Firebase, and Android and iOS releases.",
  capto:
    "Contributed features, third-party integrations, performance work, and Android and iOS releases. Not recorded as sole ownership.",
  "my-professional-rewards":
    "Authentication, responsive UI, REST API integration, bug fixes, and performance work on the rewards application.",
};
