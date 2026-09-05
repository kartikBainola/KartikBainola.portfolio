"use client";

import { GraduationCap, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Education"
          title="Academic Background"
          description="Strong foundation in computer science with hands-on mobile development experience."
        />

        <div className="grid gap-6">
          {education.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent-blue/30">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                      <GraduationCap className="h-6 w-6 text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.degree}</h3>
                      <p className="mt-1 text-accent-blue">{item.institution}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.period}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 px-5 py-3 text-center lg:text-right">
                    <p className="text-2xl font-bold gradient-text">{item.grade}</p>
                    <p className="text-xs text-muted-foreground">Cumulative GPA</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                      <BookOpen className="h-4 w-4 text-accent-cyan" />
                      Relevant Coursework
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {item.coursework.map((course) => (
                        <li
                          key={course}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider">
                      Highlights
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-purple" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
