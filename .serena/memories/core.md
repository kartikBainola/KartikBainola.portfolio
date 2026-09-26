# Portfolio — Kartik Bainola

Personal portfolio: Next.js static site (GitHub Pages) showcasing Flutter / mobile work.

## Source map (`src/`)
- `app/` — App Router: home, `blog/`, `projects/[slug]/`, `sitemap.ts`, `robots.ts`
- `components/` — `sections/` (page blocks), `layout/` (nav/footer/cmdk), `ui/` (shadcn-style), `animations/`, `effects/`, `providers/`, `pages/`, `projects/`
- `content/blog/` — MDX posts
- `data/` — static TS/JSON content (projects, skills, experience, …)
- `lib/` — `constants.ts`, SEO, blog helpers, `cn`/`withBasePath`
- `types/` — shared TS types

Outside `src/`:
- `workers/contact/` — Cloudflare Worker + Resend (contact form; no Next API on Pages)
- `scripts/fetch-store-images.mjs` — app-store image fetch
- `public/` — static assets
- Deploy: `.github/workflows/` → static `out/`

## Invariants
- `output: "export"` — static only; no Next server routes/API.
- GitHub Pages `basePath` when `GITHUB_PAGES=true`: `/KartikBainola.portfolio`. Use `withBasePath()` for plain `/public` hrefs; skip for `next/link` / `next/image`.
- Contact: browser → `NEXT_PUBLIC_CONTACT_API_URL` (Worker); Resend secrets stay on Worker only.
- Personal/content edits: `src/lib/constants.ts` + `src/data/*`, not hardcode in sections.
- Agent rule: read `node_modules/next/dist/docs/` before Next API usage (breaking vs training data). See `AGENTS.md`.

## Related
- Stack/versions: `mem:tech_stack`
- Dev/build/worker commands: `mem:suggested_commands`
- Code patterns (alias, UI, path helpers): `mem:conventions`
- Done checks: `mem:task_completion`