import { HeroSection } from "@/components/sections/hero";
import { ImpactSection } from "@/components/sections/impact";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { SkillsSection } from "@/components/sections/skills";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ProjectGallerySection } from "@/components/sections/project-gallery";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { WhyChooseMeSection } from "@/components/sections/why-choose-me";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ProjectGallerySection />
      <ServicesSection />
      <ProcessSection />
      <WhyChooseMeSection />
      <CertificationsSection />
      <ContactSection />
    </>
  );
}
