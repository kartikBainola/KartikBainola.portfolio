"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Globe, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectVisual } from "@/components/ui/project-visual";
import { projects, projectCategories } from "@/data/projects";
import { getProjectLogo } from "@/lib/project-media";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function GalleryCard({ project }: { project: Project }) {
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setGlow({ x, y, active: true });
      }}
      onMouseLeave={() => setGlow((prev) => ({ ...prev, active: false }))}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent-blue/40"
      data-cursor="project"
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          glow.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.18), transparent 42%)`,
        }}
      />

      <ProjectVisual
        title={project.title}
        icon={getProjectLogo(project)}
        color={project.color}
        category={project.category}
        variant="gallery"
        logoBackground={project.logoBackground}
      />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold transition-transform duration-300 group-hover:translate-x-0.5">
              {project.title}
            </h3>
            <span className="text-xs text-muted-foreground">{project.category}</span>
          </div>
          <div className="flex gap-1">
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="link"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="link"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="link"
              >
                <Code2 className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded bg-muted/50 px-2 py-0.5 text-[10px] transition-colors group-hover:bg-accent-blue/10"
            >
              {t}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-blue transition-transform group-hover:translate-x-0.5"
          data-cursor="link"
        >
          Case Study
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ProjectGallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Project Gallery"
          title="More Applications"
          description="A wider set of shipped products across fintech, logistics, and business domains."
        />

        <FadeIn>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="button"
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all cursor-pointer",
                  activeCategory === cat
                    ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                    : "border-border text-muted-foreground hover:border-accent-blue/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <GalleryCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
