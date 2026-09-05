import Link from "next/link";
import { Code2, Users, Mail, Phone, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const socialLinks = [
  { href: SOCIAL_LINKS.linkedin, icon: Users, label: "LinkedIn", hoverColor: "hover:border-blue-400/50 hover:text-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)]" },
  { href: SOCIAL_LINKS.github, icon: Code2, label: "GitHub", hoverColor: "hover:border-purple-400/50 hover:text-purple-400 hover:shadow-[0_0_16px_rgba(139,92,246,0.2)]" },
  { href: SOCIAL_LINKS.email, icon: Mail, label: "Email", hoverColor: "hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-[0_0_16px_rgba(16,185,129,0.2)]" },
  { href: SOCIAL_LINKS.phone, icon: Phone, label: "Phone", hoverColor: "hover:border-orange-400/50 hover:text-orange-400 hover:shadow-[0_0_16px_rgba(245,158,11,0.2)]" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50 overflow-hidden">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-accent-blue/3 blur-[80px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-accent-purple/3 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Freelance status banner */}
        <div className="mb-12 flex items-center justify-center gap-3 rounded-2xl border border-accent-emerald/20 bg-accent-emerald/5 p-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-emerald" />
          </span>
          <p className="text-sm font-semibold text-accent-emerald">🟢 Available for freelance projects</p>
          <Link
            href="#contact"
            className="rounded-full border border-accent-emerald/40 bg-accent-emerald/10 px-3 py-1 text-xs font-bold text-accent-emerald transition-all hover:bg-accent-emerald/20"
          >
            Get in Touch →
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden">
                <img src="/kb-mark.png" alt="KB" className="h-full w-full object-contain" />
              </div>
              <span className="text-base font-bold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {SITE_CONFIG.title}. Building premium cross-platform mobile applications from Dehradun, India.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-4 bg-border transition-all group-hover:w-6 group-hover:bg-accent-blue" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Connect
            </h3>
            <div className="flex gap-2.5">
              {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-all duration-300 hover:scale-110 ${hoverColor}`}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              {SITE_CONFIG.email}
            </p>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
