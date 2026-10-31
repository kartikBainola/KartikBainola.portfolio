"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { stats } from "@/data/profile";
import { cn } from "@/lib/utils";
import {
  Blocks,
  Briefcase,
  Building2,
  Smartphone,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";

const countMeta: { icon: LucideIcon }[] = [
  { icon: Smartphone },
  { icon: Briefcase },
  { icon: Building2 },
];

const textStats: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Platforms", value: "Android + iOS", icon: TabletSmartphone },
  { label: "Primary Stack", value: "Flutter", icon: Blocks },
];

const cardClassName =
  "group relative flex h-full min-h-[11.75rem] w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card/80 px-4 py-6 text-center transition-all gradient-border-hover sm:px-5";

export function ImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-cyan/5" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px section-divider" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px section-divider" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold tracking-[0.28em] text-accent-blue uppercase">
              Impact & Scale
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Production-Focused <span className="gradient-text">Delivery</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 items-stretch gap-4 min-[480px]:grid-cols-2 lg:grid-cols-5">
          {stats.slice(0, 3).map((stat, index) => {
            const Icon = countMeta[index].icon;
            return (
              <FadeIn key={stat.label} delay={index * 0.08} className="h-full min-w-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={cn(cardClassName, "hover:border-accent-blue/40")}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20">
                    <Icon className="h-5 w-5 text-accent-blue" />
                  </div>

                  <div className="flex min-h-16 w-full items-center justify-center">
                    <motion.p
                      whileInView={{ scale: [1, 1.06, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className="text-4xl font-black gradient-text"
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </motion.p>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              </FadeIn>
            );
          })}

          {textStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={0.25 + index * 0.08} className="h-full min-w-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={cn(cardClassName, "hover:border-accent-purple/40")}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple/10 transition-colors group-hover:bg-accent-purple/20">
                    <Icon className="h-5 w-5 text-accent-purple" />
                  </div>

                  <div className="flex min-h-16 w-full items-center justify-center px-0.5">
                    <p className="text-balance text-lg font-bold leading-tight tracking-tight gradient-text sm:text-xl xl:text-2xl">
                      {stat.value}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
