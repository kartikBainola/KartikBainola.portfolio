"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

interface AmbientBackgroundProps {
  className?: string;
  intensity?: "low" | "medium";
}

export function AmbientBackground({
  className,
  intensity = "medium",
}: AmbientBackgroundProps) {
  const reducedMotion = useReducedMotionPreference();

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <GridBackground />
      <NoiseOverlay />
      <motion.div
        className={cn(
          "absolute -left-24 top-16 h-[26rem] w-[26rem] rounded-full blur-3xl",
          intensity === "low" ? "bg-accent-blue/10" : "bg-accent-blue/15"
        )}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 24, 0],
                y: [0, -20, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={cn(
          "absolute -right-20 bottom-4 h-[24rem] w-[24rem] rounded-full blur-3xl",
          intensity === "low" ? "bg-accent-purple/10" : "bg-accent-purple/15"
        )}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, 20, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
}

export function GridBackground({ className }: { className?: string }) {
  return <div className={cn("absolute inset-0 grid-pattern", className)} />;
}

export function NoiseOverlay({ className }: { className?: string }) {
  return <div className={cn("noise-overlay absolute inset-0", className)} />;
}
