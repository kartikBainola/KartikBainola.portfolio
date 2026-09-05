"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  MapPin,
  Circle,
  Code2,
  Users,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { FadeIn } from "@/components/animations/fade-in";
import { profile } from "@/data/profile";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { SimpleImageCarousel } from "@/components/ui/simple-image-carousel";
import { heroApps } from "@/data/hero-apps";

const roles = [
  "Flutter Developer",
  "Mobile App Specialist",
  "iOS & Android Engineer",
  "Cross-Platform Builder",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="gradient-text font-bold">{displayed}</span>
      <span className="animate-blink h-[1em] w-[2px] rounded-full bg-accent-blue ml-0.5 inline-block" />
    </span>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
      <AmbientBackground />

      {/* Extra decorative glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-purple/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-14 lg:flex-row lg:gap-10">
          {/* ── Left content ──────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability badge */}
            <FadeIn delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/5 px-4 py-2 text-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-emerald" />
                </span>
                <span className="font-semibold text-accent-emerald">Available for freelance</span>
                <span className="text-muted-foreground/40">·</span>
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">{profile.location}</span>
              </div>
            </FadeIn>

            {/* Eyebrow */}
            <FadeIn delay={0.2}>
              <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                Mobile Application Developer
              </p>
            </FadeIn>

            {/* Name */}
            <FadeIn delay={0.3}>
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl xl:text-7xl leading-none">
                <span className="gradient-text animate-gradient" style={{ backgroundSize: "300% 300%" }}>
                  {profile.name.toUpperCase()}
                </span>
              </h1>
            </FadeIn>

            {/* Typewriter role */}
            <FadeIn delay={0.4}>
              <div className="mt-5 max-w-2xl space-y-2">
                <p className="text-2xl font-semibold sm:text-3xl leading-tight">
                  <TypewriterRole />
                </p>
                <p className="text-base text-muted-foreground sm:text-lg">
                  {profile.subtitle}
                </p>
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.5}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-lg">
                {profile.heroDescription}
              </p>
            </FadeIn>

            {/* CTA Buttons */}
            <FadeIn delay={0.6}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <MagneticButton>
                  <Button asChild size="lg" variant="gradient" className="group relative overflow-hidden">
                    <Link href="#projects" data-cursor="button">
                      {/* shine sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      View Projects
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="secondary" className="group relative overflow-hidden">
                    <a href={withBasePath(SITE_CONFIG.resumeUrl)} download data-cursor="button">
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <Download className="h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </MagneticButton>
              </div>
            </FadeIn>

            {/* Social links — pill style */}
            <FadeIn delay={0.7}>
              <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
                {[
                  { href: SOCIAL_LINKS.github, icon: Code2, label: "GitHub" },
                  { href: SOCIAL_LINKS.linkedin, icon: Users, label: "LinkedIn" },
                  { href: SOCIAL_LINKS.email, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="link"
                    className="group flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3.5 py-2 text-sm text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-accent-blue/40 hover:bg-accent-blue/5 hover:text-foreground"
                    aria-label={label}
                  >
                    <Icon className="h-3.5 w-3.5 transition-colors group-hover:text-accent-blue" />
                    <span className="text-xs font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Right — Carousel ──────────────────────────────── */}
          <div className="relative flex w-full flex-1 items-center justify-center pb-4 lg:pb-8">
            <div className="relative w-full max-w-[34rem] lg:max-w-[40rem]">
              <SimpleImageCarousel
                items={heroApps.map((app) => ({
                  video: app.video,
                  poster: app.poster,
                  alt: app.title,
                }))}
                autoplayDelay={4200}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
      </div>
    </section>
  );
}
