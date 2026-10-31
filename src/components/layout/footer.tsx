import Link from "next/link";
import { NAV_LINKS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-sans text-sm font-medium">{SITE_CONFIG.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Flutter engineer in {SITE_CONFIG.location}.
          </p>
          <a
            href={SITE_CONFIG.freelanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-sans text-sm text-foreground underline-offset-4 hover:underline"
          >
            Open to freelance work
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <ul className="space-y-2 font-sans text-sm text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-foreground lg:min-h-0">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 font-sans text-sm text-muted-foreground">
            <li>
              <a href={SOCIAL_LINKS.email} className="inline-flex min-h-11 items-center break-all hover:text-foreground lg:min-h-0">
                {SITE_CONFIG.email}
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground lg:min-h-0">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-foreground lg:min-h-0">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="font-sans text-xs text-muted-foreground">© {year} {SITE_CONFIG.name}</p>
      </div>
    </footer>
  );
}
