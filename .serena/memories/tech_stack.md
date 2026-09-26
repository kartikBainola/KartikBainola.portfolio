# Tech stack

- **App:** Next.js `16.2.10` (App Router), React `19.2.4`, TypeScript `^5`, path alias `@/*` → `src/*`
- **Style:** Tailwind CSS v4 (`@tailwindcss/postcss`), PostCSS
- **UI:** Radix primitives + CVA + `clsx`/`tailwind-merge`; Lucide icons
- **Motion:** Framer Motion, GSAP, Lenis smooth scroll
- **Content:** MDX (`@next/mdx`, `next-mdx-remote`, `gray-matter`, `reading-time`)
- **Forms:** react-hook-form + Zod + `@hookform/resolvers`
- **Contact:** Cloudflare Worker (`workers/contact`) + Resend
- **Deploy:** static export → GitHub Pages (`out/`); images `unoptimized: true`
- **Package manager:** npm (`package-lock.json`)
- **Lint:** ESLint 9 flat config — `eslint-config-next` (core-web-vitals + typescript)
- **No** dedicated test runner / Prettier scripts in `package.json`