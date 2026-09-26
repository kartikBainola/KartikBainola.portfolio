# Conventions

- **Imports:** `@/` alias for `src/` (never deep relative into `src` from app code).
- **Classnames:** `cn()` from `@/lib/utils` (clsx + twMerge).
- **Public assets under Pages:** `withBasePath("/...")` for raw `href`/`src` strings; do not double-prefix `next/link` or `next/image`.
- **UI:** shadcn-style — Radix + `cva` variants in `components/ui/`; prefer extending those over new one-off primitives.
- **Sections:** home composition via `components/sections/*` + data from `src/data/*`; keep copy/stats out of hardcoding when a data file exists.
- **Types:** shared shapes in `src/types/`; colocated types OK for local UI-only props.
- **TS:** `strict: true`; React 19 / Next JSX transform (`jsx: react-jsx`).
- **Static export:** no Node APIs, no Route Handlers, no ISR that needs a server; contact goes through Worker URL.
- **Motion/a11y:** respect reduced motion via `@/lib/use-reduced-motion` where animations are added.
- **Next APIs:** consult `node_modules/next/dist/docs/` — project Next differs from older training defaults (`AGENTS.md`).