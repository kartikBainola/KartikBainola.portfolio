import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { getCaseBlocks, type CaseBlock } from "@/data/case-studies";
import { getProjectScreenshots } from "@/lib/project-media";
import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const blocks = getCaseBlocks(project);
  const screenshots = getProjectScreenshots(project);
  const beforeResults = blocks.filter((block) => block.title !== "Verified Results");
  const results = blocks.find((block) => block.title === "Verified Results");

  return (
    <article className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-sans text-xs tracking-[0.16em] text-accent uppercase">{project.category}</p>
          <h1 className="mt-3 text-[clamp(2.25rem,8vw,3.75rem)]">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-md border border-border px-2.5 py-1 font-sans text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm">
            {project.playStore && (
              <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-foreground">
                Google Play
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.appStore && (
              <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-foreground">
                {project.appStore.includes("/search") ? "App Store search" : "App Store"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </header>

        <div className="mt-14 max-w-3xl space-y-12">
          {beforeResults.map((block) => (
            <CaseSection key={block.title} block={block} />
          ))}
        </div>

        <section className="mt-14" aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading" className="text-2xl sm:text-3xl">Screenshots and Visual Demonstrations</h2>
          {screenshots.length > 0 ? (
            <div className="mt-6">
              <ScreenshotGallery images={screenshots} title={project.title} />
            </div>
          ) : (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Screenshots are not included for this project.
            </p>
          )}
        </section>

        {results && (
          <div className="mt-14 max-w-3xl">
            <CaseSection block={results} />
          </div>
        )}

        {nextProject && (
          <section className="mt-16 border-t border-border pt-8">
            <p className="font-sans text-xs tracking-[0.16em] text-muted-foreground uppercase">Next</p>
            <h2 className="mt-2 text-2xl sm:text-3xl">{nextProject.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{nextProject.description}</p>
            <Link href={`/projects/${nextProject.id}`} className="mt-4 inline-flex min-h-11 items-center gap-1 font-sans text-sm text-foreground">
              Open case study
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}

function CaseSection({ block }: { block: CaseBlock }) {
  return (
    <section>
      <h2 className="text-2xl sm:text-3xl">{block.title}</h2>
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-base leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {block.items && block.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {block.pending && block.paragraphs.length === 0 && !block.items?.length && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{block.pending}</p>
      )}
    </section>
  );
}
