"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Code2, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectVisual } from "@/components/ui/project-visual";
import { projects } from "@/data/projects";
import { getProjectLogo, getProjectScreenshots } from "@/lib/project-media";
import { Button } from "@/components/ui/button";

export function FeaturedProjectsSection() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-card/30">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
        <div className="h-[600px] w-[800px] rounded-full bg-accent-blue/4 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Selected Work"
          title="Production Applications"
          description="Real products shipped across Android and iOS with maintainable architecture and polished UX."
        />

        <div className="space-y-20">
          {featured.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/90 transition-all duration-500 hover:border-accent-blue/30 hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
              >
                {/* Project number — large faded */}
                <span className="pointer-events-none absolute right-6 top-4 select-none text-[8rem] font-black leading-none text-foreground/[0.03] sm:text-[10rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Featured badge on first card */}
                {index === 0 && (
                  <div className="absolute left-5 top-5 z-20 flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    <Star className="h-2.5 w-2.5 fill-amber-400" />
                    Featured
                  </div>
                )}

                <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
                  {/* ── Visual area ───────────────────────── */}
                  <div className={`relative min-h-[22rem] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    {(() => {
                      const screenshots = getProjectScreenshots(project).slice(0, 3);

                      if (screenshots.length === 0) {
                        return (
                          <ProjectVisual
                            title={project.title}
                            icon={getProjectLogo(project)}
                            color={project.color}
                            category={project.category}
                            variant="featured"
                            className="h-full min-h-[22rem]"
                            logoBackground={project.logoBackground}
                          />
                        );
                      }

                      return (
                        <>
                          {/* Dynamic color gradient */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${project.color ?? "rgba(59,130,246,0.2)"} 0%, transparent 60%, rgba(139,92,246,0.15) 100%)`,
                            }}
                          />
                          <div className="absolute inset-0 grid-pattern opacity-30" />

                          <div className="relative flex h-full items-end justify-center gap-3 px-5 pt-12 sm:gap-4 sm:px-6">
                            {screenshots.map((screenshot, shotIndex) => {
                              const isPoster = project.screenshotStyle === "poster";
                              return (
                                <motion.div
                                  key={screenshot}
                                  initial={{ opacity: 0, y: 24 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.12 + shotIndex * 0.1 }}
                                  whileHover={{ y: -10, scale: 1.02 }}
                                  data-cursor="image"
                                  className={
                                    isPoster
                                      ? `relative w-[118px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/50 sm:w-[158px] ${
                                          shotIndex === 1 ? "mb-8 z-20" : "mb-2 opacity-95"
                                        }`
                                      : `relative w-[120px] overflow-hidden rounded-[1.4rem] border-[4px] border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40 sm:w-[145px] ${
                                          shotIndex === 1 ? "mb-10 z-20" : "mb-2 opacity-90"
                                        }`
                                  }
                                >
                                  {!isPoster && (
                                    <div className="absolute left-1/2 top-2.5 z-10 h-3.5 w-14 -translate-x-1/2 rounded-full bg-zinc-700" />
                                  )}
                                  <div className={isPoster ? "relative aspect-[3/4]" : "relative aspect-[9/19]"}>
                                    <Image
                                      src={screenshot}
                                      alt={`${project.title} screenshot ${shotIndex + 1}`}
                                      fill
                                      unoptimized
                                      sizes="(max-width: 640px) 120px, 160px"
                                      className={
                                        isPoster
                                          ? "object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                          : "object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                                      }
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* ── Content area ──────────────────────── */}
                  <div className={`flex flex-col justify-center p-7 sm:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="text-xs font-bold tracking-[0.22em] uppercase text-muted-foreground">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.longDescription}
                    </p>

                    {/* Tech tags — tinted by project color */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:border-accent-blue/30 group-hover:bg-accent-blue/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Store badges */}
                    {(project.playStore || project.appStore) && (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {project.playStore && (
                          <a
                            href={project.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500/20"
                            data-cursor="link"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            LIVE ON GOOGLE PLAY
                          </a>
                        )}
                        {project.appStore && (
                          <a
                            href={project.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-400 transition-all hover:bg-sky-500/20"
                            data-cursor="link"
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
                            </span>
                            LIVE ON APP STORE
                          </a>
                        )}
                      </div>
                    )}

                    {/* CTA buttons */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild variant="gradient" className="group/btn relative overflow-hidden">
                        <Link href={`/projects/${project.id}`} data-cursor="button">
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                          View Case Study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                      </Button>

                      {project.playStore && (
                        <Button asChild variant="outline">
                          <a href={project.playStore} target="_blank" rel="noopener noreferrer" data-cursor="link">
                            <ExternalLink className="h-4 w-4" />
                            Live App
                          </a>
                        </Button>
                      )}

                      {project.github && (
                        <Button asChild variant="ghost">
                          <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="link">
                            <Code2 className="h-4 w-4" />
                            Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
