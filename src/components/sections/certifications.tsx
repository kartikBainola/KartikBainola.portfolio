"use client";

import { ExternalLink, Award } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications } from "@/data/certifications";

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Certifications"
          title="Professional Credentials"
          description="Continuous learning and professional development."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent-blue/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20">
                  <Award className="h-6 w-6 text-accent-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer} · {cert.date}
                  </p>
                  {cert.credentialId && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="mt-2 inline-flex items-center gap-1 text-xs text-accent-blue hover:underline"
                    >
                      View Credential
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
