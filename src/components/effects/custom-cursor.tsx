"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

type CursorState = "default" | "link" | "project" | "image" | "button";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !isFinePointer || reducedMotion) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const state =
        target.closest("[data-cursor=project]") ? "project"
          : target.closest("[data-cursor=image]") ? "image"
            : target.closest("button, [role=button], [data-cursor=button]") ? "button"
              : target.closest("a, [data-cursor-hover]") ? "link"
                : "default";
      setCursorState(state);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorState("default");
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, reducedMotion]);

  if (typeof window !== "undefined") {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !isFinePointer || reducedMotion) return null;
  }

  const isExpanded = cursorState !== "default";
  const label = cursorState === "project" ? "VIEW PROJECT" : cursorState === "image" ? "VIEW" : "";
  const size = cursorState === "project" ? 96 : isExpanded ? 44 : 12;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          width: size,
          height: size,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full border transition-colors duration-200 ${
            isExpanded
              ? "border-accent-blue/50 bg-accent-blue/10 text-[9px] font-semibold tracking-[0.1em] text-accent-blue"
              : "border-accent-blue bg-accent-blue/20"
          }`}
        >
          {label}
        </div>
      </motion.div>
    </>
  );
}
