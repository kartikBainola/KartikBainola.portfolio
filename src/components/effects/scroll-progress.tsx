"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => setMounted(true), []);

  if (mounted && reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
