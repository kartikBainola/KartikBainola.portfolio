import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Encode each path segment so spaces and parentheses in screenshot filenames survive the URL. */
function encodePublicPath(path: string): string {
  return path
    .split("/")
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}

/** Resolve public asset paths for local hosting and GitHub Pages (`basePath`). */
export function withBasePath(path: string): string {
  if (/^(https?:|data:|blob:|\/\/)/.test(path)) return path;
  const normalizedPath = encodePublicPath(path.startsWith("/") ? path : `/${path}`);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || normalizedPath === base || normalizedPath.startsWith(`${base}/`)) return normalizedPath;
  return `${base}${normalizedPath}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
