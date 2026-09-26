# Suggested commands

## App (repo root)
- `npm install`
- `npm run dev` — Next dev server
- `npm run build` — static export to `out/`
- `npm run start` — serve production build (local)
- `npm run lint` — `eslint`
- `npm run fetch-images` — `node scripts/fetch-store-images.mjs`

## Env
- Copy template: `Copy-Item .env.example .env.local` (PowerShell; not `cp`)

## Contact worker
```powershell
cd workers/contact
npx wrangler login
npx wrangler secret put RESEND_API_KEY
npx wrangler deploy
```
Set `NEXT_PUBLIC_CONTACT_API_URL` in `.env.local` and GitHub Actions secrets to the worker URL.

## Pages basePath
CI sets `GITHUB_PAGES=true` so `basePath`/`assetPrefix` = `/KartikBainola.portfolio`. Local/dev usually unset.

## Windows shell notes
- Prefer PowerShell: `Get-ChildItem` / `Get-Content` over `ls`/`cat` if unix tools missing.
- Paths with spaces: quote `"D:\My self\portfolio"`.