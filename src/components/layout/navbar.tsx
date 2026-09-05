"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" data-cursor-hover>
            <div className="relative h-8 w-8 rounded-lg overflow-hidden">
            <Image src="/kb-mark.png" alt="KB" fill className="object-contain" />
          </div>
          <span className="text-base font-bold tracking-tight">Kartik Bainola</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Laptop className="h-4 w-4" />
            )}
          </Button>

          {/* Gradient Hire Me button */}
          <Link
            href="#contact"
            data-cursor-hover
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] relative overflow-hidden group"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Hire Me
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-b border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2.5 text-sm font-bold text-white"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
