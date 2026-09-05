"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  titleGradient?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
  titleGradient = false,
}: SectionHeadingProps) {
  // Split title: first word gets gradient, rest stays white
  const words = title.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-accent-blue/30 bg-accent-blue/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-blue"
        >
          {/* shimmer beam */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[beam_2.5s_ease-in-out_1] rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse-glow" />
          {label}
        </motion.span>
      )}

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {titleGradient ? (
          <span className="gradient-text">{title}</span>
        ) : (
          <>
            <span className="gradient-text">{firstWord}</span>
            {rest && <span> {rest}</span>}
          </>
        )}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-5 text-base text-muted-foreground leading-relaxed sm:text-lg"
        >
          {description}
        </motion.p>
      )}

      {/* decorative underline accent */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-6 h-px w-20 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan origin-left",
          align === "center" && "mx-auto origin-center"
        )}
      />
    </motion.div>
  );
}
