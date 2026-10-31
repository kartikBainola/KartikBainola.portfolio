import type { Project } from "@/types";

export function getProjectLogo(project: Project): string | undefined {
  return project.icon;
}

export function isLogoAsset(src: string, project: Project): boolean {
  const logo = getProjectLogo(project);
  if (logo && src === logo) return true;
  if (src.includes("-icon.")) return true;
  if (/logo/i.test(src)) return true;
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
