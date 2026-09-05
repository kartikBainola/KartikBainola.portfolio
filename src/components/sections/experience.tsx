"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle2, Trophy } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

// Color accent per company
const companyColors: Record<string, string> = {
  "Mindrops Solution Pvt Ltd": "from-violet-500 to-purple-600",
  "ValueVertex": "from-blue-500 to-cyan-500",
  "ResoluteAI": "from-emerald-500 to-teal-500",
  "Save Efforts LLC": "from-orange-500 to-amber-500",
};

const defaultColor = "from-accent-blue to-accent-purple";

export function ExperienceSection() {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const active = experiences.find((e) => e.id === activeId)!;
  const activeColor = companyColors[active.company] ?? defaultColor;

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-card/30">
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-purple/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Professional Journey"
          description="Building production applications across diverse industries and teams."
        />

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* ── Tab list ───────────────────────────── */}
          <FadeIn direction="left">
            <div className="relative flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              <div className="absolute left-[18px] top-0 hidden h-full w-px bg-border lg:block" />
              <motion.div
                className="absolute left-[18px] hidden w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan lg:block"
                initial={{ height: 0 }}
                animate={{
                  height: `${((experiences.findIndex((item) => item.id === activeId) + 1) / experiences.length) * 100}%`,
                }}
                transition={{ duration: 0.35 }}
              />

              {experiences.map((exp) => {
                const color = companyColors[exp.company] ?? defaultColor;
                const isActive = activeId === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveId(exp.id)}
                    data-cursor-hover
                    className={cn(
                      "relative shrink-0 rounded-xl border px-4 py-4 text-left transition-all cursor-pointer lg:ml-8",
                      isActive
                        ? "border-accent-blue/50 bg-muted glow-blue"
                        : "border-border bg-card hover:border-accent-blue/30"
                    )}
                  >
                    {/* Timeline dot */}
                    <span className="absolute -left-8 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-accent-blue bg-background lg:block" />

                    {/* Company color badge */}
                    <div className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${color} text-[9px] font-black text-white`}>
                      {exp.company.charAt(0)}
                    </div>

                    <span className="block text-sm font-bold leading-tight">{exp.company}</span>
                    <p className="mt-1 text-xs text-muted-foreground">{exp.period}</p>

                    {isActive && (
                      <motion.div
                        layoutId="activeExp"
                        className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-accent-blue to-accent-purple hidden lg:block"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ── Detail panel ───────────────────────── */}
          <FadeIn direction="right">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-8"
              >
                {/* Top gradient accent */}
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${activeColor}`} />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${activeColor} text-sm font-black text-white shadow-lg`}>
                      {active.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{active.role}</h3>
                      <p className="mt-0.5 text-base font-semibold text-accent-blue">{active.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent-blue" />
                      {active.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-accent-blue" />
                      {active.location}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {active.description}
                </p>

                {/* Responsibilities */}
                <div className="mt-6">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {active.responsibilities.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2">
                    <Trophy className="h-3.5 w-3.5 text-accent-blue" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-accent-blue/20 bg-accent-blue/5 px-3 py-1.5 text-xs font-semibold text-accent-blue/80 transition-colors hover:border-accent-blue/40 hover:bg-accent-blue/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
