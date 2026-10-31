"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contributions } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { getProjectScreenshots } from "@/lib/project-media";
import { ProjectMark } from "@/components/ui/project-mark";
import { ScreenshotGallery } from "@/components/ui/screenshot-gallery";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import type { ReactNode } from "react";
import type { Project } from "@/types";

const LIST_SCREENSHOTS = 5;

function ProjectStack({ children }: { children: ReactNode }) {
  return (
    <ScrollStack
      className="scroll-stack--projects"
      useWindowScroll
      smoothScroll={false}
      itemDistance={64}
      itemStackDistance={18}
      stackPosition={120}
      itemScale={0.04}
      baseScale={0.9}
      dimAmount={0.28}
      holdDistance={160}
    >
      {children}
    </ScrollStack>
  );
}

export function FeaturedProjectsSection() {
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-8 rounded-t-[2rem] bg-background px-4 py-16 sm:-mt-10 sm:rounded-t-[2.75rem] sm:px-8 sm:py-20 md:rounded-t-[3.5rem] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="display-heading text-center font-sans text-[clamp(2.15rem,8vw,5.5rem)] leading-none font-semibold tracking-tight uppercase">
          Projects
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Three applications shipped for Android, iOS, or both.
        </p>

        <ProjectStack>
          {featured.map((project, index) => (
            <ScrollStackItem key={project.id}>
              <ProjectPanel index={index} project={project} />
            </ScrollStackItem>
          ))}
        </ProjectStack>

        {others.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl sm:text-3xl">Other shipped applications</h3>
            <div className="mt-6">
              <ProjectStack>
                {others.map((project) => (
                  <ScrollStackItem key={project.id}>
                    <OtherProjectCard project={project} />
                  </ScrollStackItem>
                ))}
              </ProjectStack>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function OtherProjectCard({ project }: { project: Project }) {
  const shots = getProjectScreenshots(project).slice(0, LIST_SCREENSHOTS);

  return (
    <article className="project-card overflow-hidden rounded-[1.75rem] border border-border bg-card p-4 sm:rounded-[2rem] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-2xl gap-3">
          <span
            className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border"
            style={{ background: project.logoBackground ?? "var(--muted)" }}
          >
            <ProjectMark project={project} />
          </span>
          <div>
            <p className="font-sans text-base font-medium text-foreground">{project.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 font-sans text-sm">
          <Link href={`/projects/${project.id}`} className="inline-flex min-h-11 items-center text-foreground">
            Notes
          </Link>
          {project.playStore && (
            <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">
              Play
            </a>
          )}
          {project.appStore && (
            <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">
              App Store
            </a>
          )}
        </div>
      </div>
      {shots.length > 0 && (
        <div className="mt-4">
          <ScreenshotGallery images={shots} title={project.title} />
        </div>
      )}
    </article>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const shots = getProjectScreenshots(project);

  return (
      <article className="project-card overflow-hidden rounded-[1.75rem] border border-border bg-card p-4 sm:rounded-[2rem] sm:p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="font-sans text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 font-sans text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {project.category}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span
                className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border"
                style={{ background: project.logoBackground ?? "var(--muted)" }}
              >
                <ProjectMark project={project} />
              </span>
              <h3 className="text-3xl break-words sm:text-4xl">{project.title}</h3>
            </div>
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 font-sans text-xs tracking-[0.16em] uppercase transition-colors duration-200 hover:bg-foreground/5 sm:text-sm"
          >
            Case study
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>
        {contributions[project.id] && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80">{contributions[project.id]}</p>
        )}

        <div className="mt-5">
          <ScreenshotGallery images={shots.slice(0, LIST_SCREENSHOTS)} title={project.title} />
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
          {project.playStore && (
            <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground transition-colors duration-200 hover:text-foreground">
              Google Play
            </a>
          )}
          {project.appStore && (
            <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-muted-foreground transition-colors duration-200 hover:text-foreground">
              {project.appStore.includes("/search") ? "App Store search" : "App Store"}
            </a>
          )}
        </div>
      </article>
  );
}
