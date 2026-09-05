import type { NextConfig } from "next";

/** Set `GITHUB_PAGES=true` in CI so assets resolve under the repo subpath. */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/KartikBainola.portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
