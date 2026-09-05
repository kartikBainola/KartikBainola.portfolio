"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const duration = reducedMotion ? 320 : 1200;
    const start = performance.now();
    let frame = 0;
    let hideTimer: number | undefined;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const value = Math.round(eased * 100);
      setProgress(value);

      if (ratio < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        hideTimer = window.setTimeout(() => setIsLoading(false), reducedMotion ? 80 : 220);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.02,
            filter: "blur(8px)",
          }}
          transition={{ duration: reducedMotion ? 0.2 : 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
        >
          <div className="absolute inset-0 grid-pattern opacity-60" />
          <div className="absolute inset-x-0 top-1/3 h-60 bg-accent-blue/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />

          <div className="relative flex w-full max-w-md flex-col items-center gap-6 px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xs font-medium tracking-[0.35em] text-muted-foreground/80">
                KARTIK BAINOLA
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                MOBILE APPLICATION DEVELOPER
              </h2>
            </motion.div>

            <div className="w-full space-y-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/60">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.2 }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Loading experience</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
