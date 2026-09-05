import type { Project } from "@/types";

export function getProjectLogo(project: Project): string {
  return project.icon ?? project.image;
}

export function isLogoAsset(src: string, project: Project): boolean {
  if (src === getProjectLogo(project)) return true;
  if (src.includes("-icon.")) return true;
  return false;
}

export function getProjectScreenshots(project: Project): string[] {
  const sources = project.screenshots?.length
    ? project.screenshots
    : project.image
      ? [project.image]
      : [];

  return sources.filter((src) => !isLogoAsset(src, project));
}
