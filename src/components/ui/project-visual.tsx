"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  title: string;
  icon?: string;
  screenshot?: string;
  color: string;
  category?: string;
  variant?: "featured" | "gallery";
  className?: string;
  logoBackground?: string;
}

export function ProjectVisual({
  title,
  icon,
  screenshot,
  color,
  category,
  variant = "featured",
  className,
  logoBackground,
}: ProjectVisualProps) {
  const isFeatured = variant === "featured";
  const displayImage = icon || screenshot;
  const isLogoHeader = Boolean(icon);
  const isDarkLogo = Boolean(logoBackground);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isFeatured ? "h-52 sm:h-60" : "h-44",
        className
      )}
    >
      {displayImage && isLogoHeader ? (
        <>
          <div
            className="absolute inset-0"
            style={{ background: logoBackground || "#f4f1ee" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 42%, ${color}${isDarkLogo ? "40" : "24"}, transparent 68%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-8 py-7">
            <Image
              src={displayImage}
              alt={`${title} logo`}
              width={180}
              height={180}
              unoptimized
              className={cn(
                "h-[78%] w-auto object-contain transition-transform duration-700 group-hover:scale-105",
                isDarkLogo
                  ? "drop-shadow-[0_12px_28px_rgba(192,38,211,0.28)]"
                  : "drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
              )}
            />
          </div>
        </>
      ) : displayImage ? (
        <>
          <Image
            src={displayImage}
            alt={`${title} preview`}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes={isFeatured ? "(max-width: 768px) 100vw, 33vw" : "300px"}
          />
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, ${color}40, transparent)`,
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}08)`,
          }}
        />
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-card to-transparent",
          isLogoHeader ? "via-card/25" : "via-card/30"
        )}
      />

      <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5">
        {icon && !isLogoHeader && (
          <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-lg ring-2 ring-white/20">
            <Image src={icon} alt="" fill className="object-cover" sizes="36px" unoptimized />
          </div>
        )}
        {category && (
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md",
              isLogoHeader && !isDarkLogo
                ? "border-black/10 bg-white/80 text-zinc-800"
                : "border-white/10 bg-background/70"
            )}
          >
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
