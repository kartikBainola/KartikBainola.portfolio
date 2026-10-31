import { HeroSection } from "@/components/sections/hero";
import { WorkMarquee } from "@/components/sections/work-marquee";
import { StatementSection } from "@/components/sections/statement";
import { SkillsSection } from "@/components/sections/skills";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { ExperienceSection } from "@/components/sections/experience";
import { ProcessSection } from "@/components/sections/process";
import { ContactSection } from "@/components/sections/contact";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WorkMarquee />
      <StatementSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
