import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ProjectVisual } from "@/components/ui/project-visual";
import { getProjectLogo, getProjectScreenshots } from "@/lib/project-media";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

const defaultArchitecture = [
  "Flutter App",
  "Presentation Layer",
  "State Management",
  "Repository Layer",
  "API Client",
  "REST API / Backend",
];

const fallbackItems = ["Details will be added as this case study evolves."];

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const screenshots = getProjectScreenshots(project);
  const logo = getProjectLogo(project);
  const architecture = project.architecture?.length ? project.architecture : defaultArchitecture;

  return (
    <article className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <header className="rounded-3xl border border-border bg-card/80 p-8">
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">{project.category.toUpperCase()}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{project.longDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.playStore && (
              <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm hover:border-accent-blue/40">
                <ExternalLink className="h-4 w-4" />
                View on Google Play
              </a>
            )}
            {project.appStore && (
              <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm hover:border-accent-blue/40">
                <ExternalLink className="h-4 w-4" />
                View on App Store
              </a>
            )}
          </div>
        </header>

        {screenshots.length > 0 ? (
          <section
            className={
              project.screenshotStyle === "poster"
                ? "mt-10 grid gap-4 sm:grid-cols-2"
                : "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {screenshots.map((image, index) => (
              <div key={`${project.id}-${index}`} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div
                  className={project.screenshotStyle === "poster" ? "relative aspect-[3/4]" : "relative aspect-[9/16]"}
                  data-cursor="image"
                >
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className={project.screenshotStyle === "poster" ? "object-cover" : "object-cover object-top"}
                  />
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="mt-10 overflow-hidden rounded-3xl border border-border">
            <ProjectVisual
              title={project.title}
              icon={logo}
              color={project.color}
              variant="featured"
              className="h-72 sm:h-80"
              logoBackground={project.logoBackground}
            />
          </section>
        )}

        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <InfoBlock title="Overview" items={[project.description]} />
            <InfoBlock title="My Role" items={[project.role ?? "Mobile application developer across architecture, implementation, and release support."]} />
            <InfoBlock title="Key Features" items={project.features.length ? project.features : fallbackItems} />
            <InfoBlock title="Challenges" items={project.challenges?.length ? project.challenges : fallbackItems} />
            <InfoBlock title="Solutions" items={project.solutions?.length ? project.solutions : fallbackItems} />
            <InfoBlock title="Results" items={project.results?.length ? project.results : fallbackItems} />
          </div>
          <div className="space-y-8">
            <InfoBlock title="Technology" items={project.technologies} />
            <ArchitectureDiagram title={`${project.title} Architecture`} layers={architecture} />
          </div>
        </section>

        {nextProject && (
          <section className="mt-14 rounded-3xl border border-border bg-card/70 p-7">
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground">NEXT PROJECT</p>
            <h3 className="mt-2 text-2xl font-semibold">{nextProject.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{nextProject.description}</p>
            <Link
              href={`/projects/${nextProject.id}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-blue"
            >
              Open case study
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={`${title}-${item}`} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-blue" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
