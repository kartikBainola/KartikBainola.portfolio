import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix public asset paths for GitHub Pages (`basePath`). Skip for `next/image` / `next/link`. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
