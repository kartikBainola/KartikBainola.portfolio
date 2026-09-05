"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { FadeIn } from "@/components/animations/fade-in";
import { stats } from "@/data/profile";
import { Smartphone, Briefcase, Building2, Star } from "lucide-react";

const statIcons = [Smartphone, Briefcase, Building2, Star];

const fixedStats = [
  { label: "Platforms", value: "Android + iOS" },
  { label: "Primary Stack", value: "Flutter" },
];

export function ImpactSection() {
  return (
    <section id="impact" className="relative overflow-hidden py-16 sm:py-20">
      {/* Background gradient band */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-accent-purple/5 to-accent-cyan/5" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px section-divider" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px section-divider" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Label */}
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-accent-blue mb-2">
              Impact & Scale
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Production-Focused <span className="gradient-text">Delivery</span>
            </h2>
          </div>
        </FadeIn>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.slice(0, 3).map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <FadeIn key={stat.label} delay={index * 0.08} className="lg:col-span-1">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 text-center transition-all hover:border-accent-blue/40 gradient-border-hover"
                >
                  {/* top glow */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="mb-3 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20">
                      <Icon className="h-5 w-5 text-accent-blue" />
                    </div>
                  </div>

                  <motion.p
                    whileInView={{ scale: [1, 1.06, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="text-4xl font-black gradient-text"
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </motion.p>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              </FadeIn>
            );
          })}

          {fixedStats.map((stat, index) => (
            <FadeIn key={stat.label} delay={0.25 + index * 0.08} className="lg:col-span-1">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 text-center transition-all hover:border-accent-purple/40 gradient-border-hover"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="text-2xl font-bold gradient-text mt-1">{stat.value}</p>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
