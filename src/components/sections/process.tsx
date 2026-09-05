"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { Compass, Map, Pen, Code2, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "DISCOVER",
    description: "Understand the product goals, users, and business context.",
    icon: Compass,
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59,130,246,0.2)",
  },
  {
    id: "02",
    title: "PLAN",
    description: "Define architecture, feature scope, and delivery roadmap.",
    icon: Map,
    color: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    id: "03",
    title: "DESIGN",
    description: "Craft UI/UX flows and interaction details before implementation.",
    icon: Pen,
    color: "from-pink-500 to-rose-500",
    glow: "rgba(244,63,94,0.2)",
  },
  {
    id: "04",
    title: "BUILD",
    description: "Implement clean Flutter code with maintainable feature boundaries.",
    icon: Code2,
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    id: "05",
    title: "TEST",
    description: "Validate APIs, devices, and edge cases for release confidence.",
    icon: CheckCircle,
    color: "from-orange-500 to-amber-500",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    id: "06",
    title: "LAUNCH",
    description: "Ship to Play Store/App Store and monitor post-release quality.",
    icon: Rocket,
    color: "from-red-500 to-pink-500",
    glow: "rgba(239,68,68,0.2)",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="How I Work"
          title="From Idea to Production"
          description="A predictable process that keeps product quality and delivery speed aligned."
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden gap-4 lg:grid lg:grid-cols-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.id} delay={index * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative h-full"
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-2 top-7 z-20 h-px w-4 bg-gradient-to-r from-accent-blue/40 to-transparent" />
                  )}

                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 transition-all duration-300 group-hover:border-transparent gradient-border-hover">
                    {/* Gradient glow bg on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${step.glow} 0%, transparent 70%)` }}
                    />

                    {/* Icon with gradient */}
                    <div className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Step number */}
                    <p className={`mb-1.5 text-[10px] font-black tracking-[0.25em] bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.id}
                    </p>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative space-y-0 lg:hidden">
          {/* Vertical line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan/40" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.id} delay={index * 0.06}>
                <div className="relative flex gap-5 pb-6 last:pb-0">
                  {/* Icon node */}
                  <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="flex-1 rounded-2xl border border-border bg-card/80 p-4">
                    <p className={`text-[10px] font-black tracking-[0.25em] bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-1`}>
                      {step.id}
                    </p>
                    <h3 className="text-sm font-bold">{step.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
