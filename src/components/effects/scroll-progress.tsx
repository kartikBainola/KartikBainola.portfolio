"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

const HOME_SECTIONS: ProgressSection[] = [
  { id: "hero", label: "HERO" },
  { id: "impact", label: "IMPACT" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "TECH STACK" },
  { id: "projects", label: "SELECTED WORK" },
  { id: "services", label: "SERVICES" },
  { id: "process", label: "HOW I WORK" },
  { id: "blog", label: "BLOG" },
  { id: "contact", label: "CONTACT" },
] ;

type ProgressSection = {
  id: string;
  label: string;
};

export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<ProgressSection>(HOME_SECTIONS[0]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = useMemo(() => {
    if (pathname !== "/") {
      return [{ id: "page", label: pathname === "/blog" ? "BLOG" : "PAGE" }];
    }
    return HOME_SECTIONS;
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => {
      const candidates = sections
        .map((section) => {
          if (section.id === "hero") {
            return { ...section, top: 0 };
          }
          const element = document.getElementById(section.id);
          return element ? { ...section, top: element.getBoundingClientRect().top } : null;
        })
        .filter((item) => item !== null)
        .sort((a, b) => Math.abs(a.top) - Math.abs(b.top));

      const current = candidates.find((entry) => entry.top <= 260) ?? candidates[0];
      if (current) {
        setActiveSection({ id: current.id, label: current.label });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, sections]);

  const sectionIndex = sections.findIndex((item) => item.id === activeSection.id);
  const current = sectionIndex >= 0 ? sectionIndex + 1 : 1;
  const sectionToDisplay = pathname === "/" ? activeSection : sections[0];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
        style={{ scaleX }}
      />
    </>
  );
}
