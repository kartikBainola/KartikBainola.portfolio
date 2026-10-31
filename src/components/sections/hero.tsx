import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { SimpleImageCarousel } from "@/components/ui/simple-image-carousel";
import { ProjectMark } from "@/components/ui/project-mark";
import { heroApps } from "@/data/hero-apps";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";

export function HeroSection() {
  return (
    <section id="hero" className="overflow-x-clip px-4 pt-24 pb-14 sm:px-8 sm:pt-28 md:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12">
        <div className="min-w-0 text-center lg:text-left">
          <p className="enter font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase sm:text-sm">
            Flutter engineer
            <span className="px-2 text-border">·</span>
            Dehradun
          </p>
          <h1 className="display-heading enter-2 mt-3 max-w-full font-sans text-[clamp(2.35rem,calc(7.2vw+0.4rem),6.25rem)] leading-[0.9] font-semibold tracking-[-0.045em] uppercase">
            <span className="block">Kartik</span>
            <span className="block">Bainola</span>
          </h1>
          <p className="enter-3 mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {profile.heroDescription}
          </p>
          <div className="enter-4 mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild>
              <Link href="#projects" className="group">
                Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <a href={withBasePath(SITE_CONFIG.resumeUrl)} download>
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
          <div className="enter-5 mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
            <a
              href={SITE_CONFIG.freelanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <span className="availability-dot h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              Freelance
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="enter-3 min-w-0">
          <SimpleImageCarousel
            items={heroApps.map((app) => ({
              video: app.video,
              poster: app.poster,
              alt: `${app.title} preview`,
            }))}
            autoplayDelay={4200}
          />
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="group flex min-h-11 items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 transition-colors duration-200 hover:border-accent"
                  title={project.title}
                >
                  <span
                    className="relative h-8 w-8 overflow-hidden rounded-full border border-border"
                    style={{ background: project.logoBackground ?? "var(--muted)" }}
                  >
                    <ProjectMark project={project} sizes="32px" className="p-1" />
                  </span>
                  <span className="max-w-28 truncate font-sans text-xs text-muted-foreground group-hover:text-foreground">
                    {project.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
