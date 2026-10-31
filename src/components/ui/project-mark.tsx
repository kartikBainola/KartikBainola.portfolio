import Image from "next/image";
import type { Project } from "@/types";
import { getProjectLogo } from "@/lib/project-media";
import { cn, withBasePath } from "@/lib/utils";

function initials(title: string): string {
  const words = title.split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((word) => word[0] ?? "");
  return letters.join("").toUpperCase();
}

export function ProjectMark({
  project,
  className,
  sizes = "44px",
}: {
  project: Project;
  className?: string;
  sizes?: string;
}) {
  const logo = getProjectLogo(project);

  if (!logo) {
    return (
      <span
        className={cn(
          "flex h-full w-full items-center justify-center font-sans text-[10px] font-semibold tracking-tight text-foreground",
          className,
        )}
      >
        {initials(project.title)}
      </span>
    );
  }

  return (
    <Image
      src={withBasePath(logo)}
      alt=""
      fill
      unoptimized
      sizes={sizes}
      className={cn("object-contain p-1.5", className)}
    />
  );
}
