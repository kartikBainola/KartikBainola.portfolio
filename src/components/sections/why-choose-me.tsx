"use client";

import {
  Rocket, Layers, Palette, TrendingUp, Clock, Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyChooseMe } from "@/data/profile";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  rocket: Rocket, layers: Layers, palette: Palette,
  "trending-up": TrendingUp, clock: Clock, shield: Shield,
};

const cardGradients = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-sky-500 to-blue-500",
];

const cardGlows = [
  "rgba(59,130,246,0.12)",
  "rgba(139,92,246,0.12)",
  "rgba(244,63,94,0.12)",
  "rgba(16,185,129,0.12)",
  "rgba(245,158,11,0.12)",
  "rgba(14,165,233,0.12)",
];

export function WhyChooseMeSection() {
  return (
    <section id="why-me" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-80 w-[900px] rounded-full bg-accent-blue/4 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Me"
          title="The Difference I Bring"
          description="Not just code — a commitment to quality, scalability, and long-term success."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseMe.map((item, index) => {
            const Icon = iconMap[item.icon] || Rocket;
            const gradient = cardGradients[index % cardGradients.length];
            const glow = cardGlows[index % cardGlows.length];
            return (
              <FadeIn key={item.title} delay={index * 0.07}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-400 gradient-border-hover"
                >
                  {/* Radial glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle at 20% 20%, ${glow} 0%, transparent 60%)` }}
                  />

                  {/* Top gradient bar */}
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  <div className="relative">
                    {/* Animated icon */}
                    <div className="mb-5 relative">
                      <div
                        className={`absolute inset-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} blur-lg opacity-0 transition-all duration-400 group-hover:opacity-40 group-hover:scale-110`}
                      />
                      <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold">{item.title}</h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
