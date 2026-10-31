"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const magnetic = finePointer && !reducedMotion;

  const handleMouse = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: magnetic ? position.x : 0, y: magnetic ? position.y : 0 }}
      whileHover={magnetic ? { scale: 1.02 } : undefined}
      whileTap={magnetic ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 160, damping: 16, mass: 0.15 }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
