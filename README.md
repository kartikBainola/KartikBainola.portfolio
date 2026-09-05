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
- **Email:** Resend API
- **Smooth Scroll:** Lenis
- **Blog:** MDX with next-mdx-remote
- **Deployment:** Vercel

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
│   ├── api/contact/      # Contact form API route
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
```

## Customization

### Personal Information
Update `src/lib/constants.ts` and `src/data/` files with your details.

### Freelance Website Link
Change `freelanceUrl` in `src/lib/constants.ts` to your freelance website URL.

### Contact Form
1. Copy env template: `cp .env.example .env.local`
2. Create a free [Resend](https://resend.com) API key and set `RESEND_API_KEY`
3. Keep `CONTACT_EMAIL=kartikbainola1303@gmail.com` (already set)

**Local:** use `RESEND_FROM_EMAIL=Portfolio <onboarding@resend.dev>` (Resend test sender). Submissions go to your Resend account email until a domain is verified.

**Production (Vercel):** add the same vars in Project → Settings → Environment Variables for Production (and Preview if you want). After verifying a domain in Resend, set e.g. `RESEND_FROM_EMAIL=Portfolio <noreply@yourdomain.com>`.

If Resend is unavailable or the key is missing, the form falls back to the visitor’s `mailto:` client.

### Resume
Place your resume PDF at `public/resume.pdf`.

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

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

Set these environment variables in Vercel (Production + Preview):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | `kartikbainola1303@gmail.com` |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Portfolio <noreply@yourdomain.com>` |

## License

Private — All rights reserved.
