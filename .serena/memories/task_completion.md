# Task completion checks

No test or format scripts in package.json. After substantive code changes:

1. `npm run lint` — ESLint (next core-web-vitals + typescript)
2. `npm run build` — must succeed with static export (`out/`); catch App Router / export / `basePath` breakages

Optional when touching contact/env:
- Confirm `.env.local` has `NEXT_PUBLIC_CONTACT_API_URL`; Worker secrets not committed.
- If CI/Pages pathing changed, verify `GITHUB_PAGES=true` build still resolves assets under `/KartikBainola.portfolio`.

Typecheck: covered by `next build` / IDE (`tsc` not a standalone script).