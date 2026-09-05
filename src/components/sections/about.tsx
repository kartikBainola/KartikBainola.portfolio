"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, aboutTimeline } from "@/data/profile";
import {
  GraduationCap, Code2, Building2, Rocket, Briefcase,
} from "lucide-react";

const pipeline = [
  "IDEA",
  "ARCHITECTURE",
  "UI/UX",
  "DEVELOPMENT",
  "API INTEGRATION",
  "TESTING",
  "APP STORE",
  "MAINTENANCE",
];

const industryColors: Record<string, string> = {
  "Education": "text-sky-400 border-sky-400/30 bg-sky-400/8",
  "Finance & AI": "text-emerald-400 border-emerald-400/30 bg-emerald-400/8",
  "E-Commerce": "text-orange-400 border-orange-400/30 bg-orange-400/8",
  "Enterprise & Rewards": "text-purple-400 border-purple-400/30 bg-purple-400/8",
  "Logistics": "text-cyan-400 border-cyan-400/30 bg-cyan-400/8",
  "Warehousing": "text-rose-400 border-rose-400/30 bg-rose-400/8",
};

const timelineIcons = [GraduationCap, Code2, Building2, Rocket];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* radial glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-blue/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="About Me"
          title="I Build Products, Not Just Interfaces"
          description="From architecture decisions to production deployments, I focus on shipping reliable mobile products."
        />

        <div className="grid gap-14 lg:grid-cols-2">
          {/* ── Left: Bio + industries ─────────────────────── */}
          <FadeIn direction="left">
            <div className="space-y-6">
              {/* Avatar + name block */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden">
                    <Image src="/kb-mark.png" alt="KB" width={64} height={64} className="object-contain bg-transparent" />
                  </div>
                  {/* open to work badge */}
                  <div className="absolute -bottom-1.5 -right-1.5 rounded-full border border-accent-emerald/40 bg-background px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-emerald">
                    Open
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
                I build <span className="gradient-text">products</span>,<br />
                not just interfaces.
              </h3>

              <div className="space-y-4">
                {profile.about.split("\n\n").map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Industry tags */}
              <div className="pt-2">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-blue flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  Industries Served
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.industries.map((industry) => (
                    <span
                      key={industry}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105 ${
                        industryColors[industry] ??
                        "text-muted-foreground border-border bg-muted/50"
                      }`}
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Right: Timeline + Pipeline ─────────────────── */}
          <FadeIn direction="right">
            <div className="space-y-6">
              {/* Journey timeline */}
              <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-md">
                <p className="mb-6 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  Journey
                </p>
                <div className="relative space-y-0">
                  {/* vertical line */}
                  <div className="absolute left-[18px] top-5 bottom-5 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan/40" />

                  {aboutTimeline.map((item, index) => {
                    const Icon = timelineIcons[index] ?? Rocket;
                    return (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: index * 0.1, duration: 0.45 }}
                        className="group relative flex gap-4 pb-7 last:pb-0"
                      >
                        {/* Icon node */}
                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 bg-card transition-colors group-hover:border-accent-blue group-hover:bg-accent-blue/10">
                          <Icon className="h-4 w-4 text-accent-blue" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-accent-blue">{item.year}</span>
                          </div>
                          <p className="text-sm font-semibold leading-snug">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Pipeline */}
              <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-md">
                <p className="mb-5 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                  Delivery Pipeline
                </p>
                <div className="flex flex-wrap gap-2">
                  {pipeline.map((step, index) => (
                    <motion.span
                      key={step}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: index * 0.06 }}
                      className="flex items-center gap-1.5 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 text-xs font-semibold text-accent-blue/90 hover:bg-accent-blue/10 transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      {step}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
