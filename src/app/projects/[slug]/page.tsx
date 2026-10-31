import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { projects } from "@/data/projects";
import { absoluteUrl, pageUrl } from "@/lib/constants";
import { createMetadata } from "@/lib/seo";
import { getProjectLogo, getProjectScreenshots } from "@/lib/project-media";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};

  const shareImage = getProjectLogo(project) ?? getProjectScreenshots(project)[0] ?? project.image;

  return createMetadata({
    title: `${project.title} Case Study`,
    description: project.description,
    alternates: { canonical: pageUrl(`/projects/${project.id}`) },
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      images: [
        {
          url: absoluteUrl(shareImage),
          width: 1200,
          height: 630,
          alt: `${project.title} logo`,
        },
      ],
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.id === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return <ProjectCaseStudy project={project} nextProject={nextProject} />;
}
