"use client";

import { useState } from "react";
import {
  Smartphone, Code, Globe, Database, Zap, Blocks, Share,
  Play, Store, Workflow, Link, GitBranch, Code2, PenTool,
  Terminal, Flame, Cloud, Bell, Key, Layers, Shield, Gauge,
  CreditCard, Map, Layout, Network, Box, Wrench, Upload, Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory } from "@/types";

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: Smartphone, code: Code, android: Smartphone, apple: Smartphone,
  globe: Globe, layout: Layout, api: Network, network: Network,
  database: Database, box: Box, zap: Zap, blocks: Blocks, share: Share,
  play: Play, store: Store, workflow: Workflow, link: Link,
  "git-branch": GitBranch, github: Code2, figma: PenTool, terminal: Terminal,
  flame: Flame, cloud: Cloud, bell: Bell, key: Key, layers: Layers,
  shield: Shield, gauge: Gauge, "credit-card": CreditCard, map: Map,
  wrench: Wrench, upload: Upload, palette: Palette,
};

// Category accent colors
const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  "Core": { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  "Platforms": { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  "UI": { text: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/30" },
  "State Management": { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  "Backend": { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  "DevOps": { text: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
  "Tools": { text: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
};

const defaultColor = { text: "text-accent-blue", bg: "bg-accent-blue/10", border: "border-accent-blue/30" };

// Duplicate skills for seamless marquee
const marqueeSkills = [...skills, ...skills];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");

  const groupedSkills = skillCategories.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  }));

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-96 w-[800px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Skills"
          title="Technical Expertise"
          description="A comprehensive toolkit for building world-class mobile applications."
        />

        {/* Category filters */}
        <FadeIn>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              data-cursor-hover
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                activeCategory === "All"
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue shadow-[0_0_16px_rgba(59,130,246,0.15)]"
                  : "border-border text-muted-foreground hover:border-accent-blue/30 hover:text-foreground"
              )}
            >
              All
            </button>
            {skillCategories.map((cat) => {
              const color = categoryColors[cat] ?? defaultColor;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor-hover
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                    activeCategory === cat
                      ? `${color.border} ${color.bg} ${color.text} shadow-sm`
                      : "border-border text-muted-foreground hover:border-accent-blue/30 hover:text-foreground"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", activeCategory === cat ? color.bg.replace("bg-", "bg-") : "bg-muted-foreground/50")} />
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Skill cards */}
        <AnimatePresence mode="wait">
          {activeCategory === "All" ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {groupedSkills.map((group, groupIndex) => {
                const color = categoryColors[group.category] ?? defaultColor;
                return (
                  <FadeIn key={group.category} delay={groupIndex * 0.04}>
                    <div>
                      <div className="mb-4 flex items-center gap-2">
                        <span className={cn("h-1.5 w-6 rounded-full bg-gradient-to-r", color.text.replace("text-", "from-"), "to-transparent")} />
                        <h3 className={cn("text-xs font-bold tracking-[0.2em]", color.text)}>
                          {group.category.toUpperCase()}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {group.items.map((skill) => {
                          const Icon = iconComponents[skill.icon] || Code;
                          return (
                            <motion.div
                              key={skill.name}
                              whileHover={{ y: -5, scale: 1.04 }}
                              className={cn(
                                "group glass-card relative flex flex-col items-center gap-2.5 rounded-2xl p-5 transition-all duration-300 hover:glow-blue-sm cursor-default gradient-border-hover"
                              )}
                            >
                              <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-all", color.bg, "group-hover:scale-110")}>
                                <Icon className={cn("h-5 w-5 transition-colors", color.text)} />
                              </div>
                              <span className="text-center text-xs font-semibold leading-tight">{skill.name}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {filtered.map((skill, index) => {
                const Icon = iconComponents[skill.icon] || Code;
                const color = categoryColors[skill.category] ?? defaultColor;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ y: -5, scale: 1.04 }}
                    className="group glass-card relative flex flex-col items-center gap-2.5 rounded-2xl p-5 transition-all duration-300 hover:glow-blue-sm cursor-default gradient-border-hover"
                  >
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-all", color.bg, "group-hover:scale-110")}>
                      <Icon className={cn("h-5 w-5", color.text)} />
                    </div>
                    <span className="text-center text-xs font-semibold leading-tight">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60">All Technologies</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="flex gap-3">
            <div className="flex animate-marquee gap-3">
              {marqueeSkills.map((skill, i) => {
                const Icon = iconComponents[skill.icon] || Code;
                const color = categoryColors[skill.category] ?? defaultColor;
                return (
                  <div
                    key={`${skill.name}-${i}`}
                    className={cn("flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium", color.border, color.bg, color.text)}
                  >
                    <Icon className="h-3 w-3" />
                    {skill.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
