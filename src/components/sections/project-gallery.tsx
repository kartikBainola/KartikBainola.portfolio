"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { DriftWall } from "@/components/ui/drift-wall";
import { projects, projectCategories } from "@/data/projects";
import { getProjectLogo } from "@/lib/project-media";
import { cn, withBasePath } from "@/lib/utils";

export function ProjectGallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="gallery" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Project Gallery"
          title="More Applications"
          description="A wider set of shipped products across fintech, logistics, and business domains."
        />

        <FadeIn>
          <div className="mb-8 flex flex-wrap justify-start gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="button"
                className={cn(
                  "min-h-11 rounded-lg border px-4 py-2 text-sm transition-all cursor-pointer",
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

        <FadeIn>
          <div className="grid grid-cols-2 gap-3 rounded-[2rem] border border-white/[0.06] bg-card/30 p-3 sm:hidden">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-white/[0.08] bg-card"
              >
                <Image
                  src={withBasePath(getProjectLogo(project) ?? project.image)}
                  alt={`${project.title} logo`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 45vw"
                  className="object-contain p-5 opacity-80 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-x-2 bottom-2 truncate rounded-md bg-background/80 px-2 py-1 text-center text-[10px] font-semibold text-foreground backdrop-blur-sm">
                  {project.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden h-[520px] overflow-hidden rounded-[2rem] border border-white/[0.06] bg-card/30 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:block sm:h-[620px] sm:p-3">
            <DriftWall
              items={filtered.map((project) => ({
                image: getProjectLogo(project) ?? project.image,
                title: project.title,
                href: `/projects/${project.id}`,
              }))}
              columns={Math.min(5, Math.max(2, filtered.length))}
              tileWidth={190}
              tileHeight={128}
              gap={18}
              tilt={12}
              turn={-10}
              perspective={1300}
              depth={100}
              speed={32}
              variance={0.28}
              parallax={0.45}
              lift={52}
              fade={0.5}
              dim={0.68}
              grayscale
              overlayColor="#050812"
              className="h-full"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
