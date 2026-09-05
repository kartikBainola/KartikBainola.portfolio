# Kartik Bainola — Portfolio

A premium, modern personal portfolio website built with Next.js 15, showcasing Flutter development expertise and production mobile applications.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **UI Components:** Shadcn-style custom components
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Email:** Resend via Cloudflare Worker
- **Smooth Scroll:** Lenis
- **Blog:** MDX with next-mdx-remote
- **Deployment:** GitHub Pages (static export)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── blog/             # Blog pages
│   ├── layout.tsx        # Root layout with SEO
│   ├── page.tsx          # Home page
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # Robots.txt
├── components/
│   ├── animations/       # Framer Motion wrappers
│   ├── effects/          # Loading screen, cursor, scroll progress
│   ├── layout/           # Navbar, Footer, Command Menu
│   ├── providers/        # Theme, smooth scroll providers
│   ├── sections/         # Page sections (Hero, About, etc.)
│   └── ui/               # Reusable UI components
├── content/blog/         # MDX blog posts
├── data/                 # Static data (projects, skills, etc.)
├── lib/                  # Utilities, SEO, blog helpers
└── types/                # TypeScript type definitions
workers/
└── contact/              # Cloudflare Worker (Resend contact API)
```

## Customization

### Personal Information
Update `src/lib/constants.ts` and `src/data/` files with your details.

### Freelance Website Link
Change `freelanceUrl` in `src/lib/constants.ts` to your freelance website URL.

### Contact Form
GitHub Pages cannot run a Next.js API route. Contact email uses a **Cloudflare Worker** + Resend.

1. Copy env template: `cp .env.example .env.local`
2. Deploy the worker:
   ```bash
   cd workers/contact
   npx wrangler login
   npx wrangler secret put RESEND_API_KEY
   npx wrangler deploy
   ```
3. Set `NEXT_PUBLIC_CONTACT_API_URL` in `.env.local` to the worker URL
4. In GitHub → **Settings → Secrets and variables → Actions**, add the same `NEXT_PUBLIC_CONTACT_API_URL` secret (used by the Pages build)

Keep `CONTACT_EMAIL` / `RESEND_FROM_EMAIL` on the worker (`wrangler.toml` / Cloudflare dashboard).  
If the worker URL is missing or Resend fails, the form falls back to `mailto:`.

### Resume
Place your resume PDF at `public/KartikBainola_2026_resume.pdf`.

### Projects
Edit `src/data/projects.ts` to add your real projects with store links.

## Features

- Premium dark/light mode design
- Animated phone mockups in hero
- Interactive experience timeline
- Filterable project gallery
- Command menu (⌘K) with search
- MDX blog with SEO
- Contact form with validation
- Scroll progress bar & back to top
- Custom cursor effects
- Magnetic buttons
- Full SEO (Open Graph, Schema.org, sitemap)
- Responsive across all devices

## Deployment (GitHub Pages)

1. Push to `main` (workflow: `.github/workflows/deploy.yml`)
2. Repo → **Settings → Pages** → Source: **GitHub Actions**
3. Add Actions secret: `NEXT_PUBLIC_CONTACT_API_URL` = your Cloudflare Worker URL
4. Site URL: `https://kartikbainola.github.io/KartikBainola.portfolio/`

Local static build (same as CI):

```bash
# Windows PowerShell
$env:GITHUB_PAGES="true"; npm run build
```

Worker secrets (Resend) live in **Cloudflare**, not in GitHub Pages env — Pages has no server at runtime.

## License

Private — All rights reserved.
