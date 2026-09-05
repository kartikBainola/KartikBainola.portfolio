"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Smartphone, Palette, Globe, Flame, Network, Wrench, Gauge, Upload,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { services } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: Smartphone, palette: Palette, globe: Globe, flame: Flame,
  api: Network, wrench: Wrench, gauge: Gauge, upload: Upload,
};

const serviceTechTags: Record<string, string[]> = {
  "flutter-dev": ["Flutter", "Dart", "Clean Architecture"],
  "ui-dev": ["Responsive UI", "Animations", "UX"],
  "flutter-web": ["Flutter Web", "PWA", "Cross-platform"],
  firebase: ["Firebase", "Firestore", "Push Notifications"],
  api: ["REST APIs", "Authentication", "Caching"],
  maintenance: ["Bug Fixes", "Refactoring", "Monitoring"],
  performance: ["Profiling", "Optimization", "60 FPS"],
  publishing: ["Play Store", "App Store", "Release"],
};

// Per-service gradient colors
const serviceGradients: Record<string, string> = {
  "flutter-dev": "from-blue-500 to-cyan-500",
  "ui-dev": "from-pink-500 to-rose-500",
  "flutter-web": "from-violet-500 to-purple-500",
  firebase: "from-orange-500 to-amber-500",
  api: "from-teal-500 to-emerald-500",
  maintenance: "from-slate-500 to-gray-500",
  performance: "from-yellow-500 to-orange-500",
  publishing: "from-green-500 to-emerald-500",
};

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-card/30 overflow-hidden">
      {/* Centered radial glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-accent-purple/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          description="Production-ready Flutter services tailored to product teams and founders."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] || Smartphone;
            const gradient = serviceGradients[service.id] ?? "from-accent-blue to-accent-purple";
            return (
              <FadeIn key={service.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 gradient-border-hover"
                >
                  {/* Gradient top strip */}
                  <div className={`h-1 w-full bg-gradient-to-r ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  {/* Subtle gradient bg */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.04]`} />

                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <h3 className="text-sm font-bold leading-snug">{service.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(serviceTechTags[service.id] ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={0.35}>
          <div className="mt-14 flex flex-col items-center gap-4">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-sm text-muted-foreground">Ready to build something great?</p>
            <MagneticButton>
              <Button asChild size="lg" variant="gradient" className="group relative overflow-hidden">
                <Link href={SITE_CONFIG.freelanceUrl} data-cursor-hover>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  View Development Services
                </Link>
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
