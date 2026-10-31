"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { education } from "@/data/education";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });
  const study = education[0];

  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs tracking-[0.16em] text-accent uppercase">Professional experience</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3rem)]">Employment as recorded</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            ValueVertex Solutions and ResoluteAI Software Pvt Ltd are both listed for Nov 2024 — Feb 2025.
          </p>
        </Reveal>

        <div ref={trackRef} className="relative mt-14">
          <div className="absolute top-2 bottom-2 left-[6px] w-px bg-border" aria-hidden />
          <motion.div
            className="absolute top-2 bottom-2 left-[6px] w-px origin-top bg-accent"
            style={{ scaleY }}
            aria-hidden
          />

          <ol className="space-y-12">
            {experiences.map((role, index) => (
              <li key={role.id} className="relative pl-10">
                <Reveal delay={Math.min(index * 80, 240)}>
                <span className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
                <div className="grid gap-4 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-10">
                  <div>
                    <p className="font-sans text-xs tracking-wide text-muted-foreground">{role.period}</p>
                    <h3 className="mt-2 text-2xl sm:text-3xl">{role.company}</h3>
                    <p className="mt-1 font-sans text-sm text-foreground/90">{role.role}</p>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">{role.location}</p>
                  </div>
                  <div>
                    <p className="text-base leading-relaxed text-muted-foreground">{role.description}</p>
                    <ul className="mt-4 space-y-2">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {role.technologies.map((tech) => (
                        <li key={tech} className="rounded-md border border-border px-2 py-1 font-sans text-xs text-muted-foreground">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {study && (
          <p className="mt-14 max-w-2xl border-t border-border pt-6 font-sans text-sm leading-relaxed text-muted-foreground">
            Education: {study.degree}, {study.institution}. {study.period}. {study.grade}.
          </p>
        )}
      </div>
    </section>
  );
}
