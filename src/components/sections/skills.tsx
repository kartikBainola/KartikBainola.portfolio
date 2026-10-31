"use client";

import { Reveal } from "@/components/animations/reveal";
import {
  Bell,
  Blocks,
  CreditCard,
  Database,
  Flame,
  Gauge,
  GitBranch,
  Globe,
  Key,
  Layers,
  Network,
  Play,
  Smartphone,
  Store,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { skillCategories, skillCategoryNotes, skills } from "@/data/skills";
import type { SkillCategory } from "@/types";

const icons: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  code: Smartphone,
  android: Smartphone,
  apple: Smartphone,
  globe: Globe,
  layers: Layers,
  zap: Layers,
  blocks: Blocks,
  flame: Flame,
  api: Network,
  key: Key,
  bell: Bell,
  "credit-card": CreditCard,
  database: Database,
  "git-branch": GitBranch,
  workflow: Workflow,
  play: Play,
  store: Store,
  gauge: Gauge,
};

const tones: Record<SkillCategory, string> = {
  "Mobile Development": "var(--tone-1)",
  "Architecture and State Management": "var(--tone-2)",
  "Backend and Integrations": "var(--tone-3)",
  "Development and Delivery": "var(--tone-4)",
};

export function SkillsSection() {
  const groups = skillCategories.map((category, index) => ({
    category,
    index: String(index + 1).padStart(2, "0"),
    note: skillCategoryNotes[category],
    tone: tones[category],
    items: skills.filter((skill) => skill.category === category),
  }));

  return (
    <section
      id="skills"
      className="rounded-t-[2rem] bg-[#f3f0e8] px-4 py-16 text-[#14181c] sm:rounded-t-[2.75rem] sm:px-8 sm:py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-sans text-[clamp(2.15rem,8vw,5.5rem)] leading-none font-semibold tracking-tight uppercase">
          Expertise
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-[#14181c]/70 sm:text-base">
          Grouped by the work recorded on the projects and roles on this site.
        </p>

        <div className="mt-10 border-t border-[#14181c]/15 sm:mt-14" role="list">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 80}>
              <div role="listitem" className="grid gap-3 border-b border-[#14181c]/15 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-8">
                <p className="font-sans text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
                  {group.index}
                </p>
                <div className="min-w-0">
                  <h3 className="font-sans text-xl leading-tight font-medium tracking-wide break-words uppercase sm:text-2xl">
                    {group.category}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed font-light break-words text-[#14181c]/70 sm:text-base">
                    {group.note}
                  </p>
                  <ul className="mt-5 divide-y divide-[#14181c]/10">
                    {group.items.map((skill) => {
                      const Icon = icons[skill.icon] ?? Smartphone;
                      return (
                        <li key={skill.name} className="py-3">
                          <div className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4 shrink-0" style={{ color: group.tone }} aria-hidden />
                            <span className="font-sans text-sm font-medium">{skill.name}</span>
                          </div>
                          <p className="mt-1 pl-6 font-sans text-sm leading-relaxed break-words text-[#14181c]/65">
                            {skill.detail}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
