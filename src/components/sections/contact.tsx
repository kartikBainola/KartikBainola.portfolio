"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Code2, Users, Mail, Phone, CircleCheck, Download, Clock, Globe, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { withBasePath } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

function openMailtoFallback(data: ContactForm) {
  const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
  window.open(
    `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`,
    "_self"
  );
}

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();

    // Static GitHub Pages has no Next.js API — use Cloudflare Worker URL, or mailto.
    if (!endpoint) {
      openMailtoFallback(data);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 6000);
        return;
      }

      if (response.status === 503 || response.status >= 500) {
        openMailtoFallback(data);
        return;
      }

      setSubmitError("Could not send your message. Please try again or email me directly.");
    } catch {
      openMailtoFallback(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { icon: Users, label: "LinkedIn", href: SOCIAL_LINKS.linkedin, color: "text-blue-400 border-blue-400/30 bg-blue-400/8" },
    { icon: Code2, label: "GitHub", href: SOCIAL_LINKS.github, color: "text-purple-400 border-purple-400/30 bg-purple-400/8" },
    { icon: Mail, label: "Email", href: SOCIAL_LINKS.email, color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/8" },
    { icon: Phone, label: "Phone", href: SOCIAL_LINKS.phone, color: "text-orange-400 border-orange-400/30 bg-orange-400/8" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-card/30 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-accent-blue/8 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-[350px] w-[350px] rounded-full bg-accent-purple/8 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px section-divider" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Big headline */}
        <FadeIn>
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-blue">
              <Sparkles className="h-3 w-3" />
              Contact
            </span>
          </div>
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s{" "}
              <span className="gradient-text animate-gradient" style={{ backgroundSize: "300% 300%" }}>
                Talk
              </span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Have an app idea, an existing product to improve, or a Flutter project that needs experienced execution?
            </p>
          </div>

          {/* Status indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-accent-blue" />
              Replies within 24 hours
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5 text-accent-purple" />
              IST (UTC +5:30) · Dehradun, India
            </div>
            <div className="flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/5 px-4 py-2 text-xs text-accent-emerald">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
              </span>
              Available for freelance
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* ── Left: links ────────────────────────── */}
          <FadeIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold">Get in Touch</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Whether you need a full app built from scratch, help with an existing project, or just want to chat about mobile development — I&apos;m always open to new opportunities.
                </p>
              </div>

              <CopyEmailButton email={SITE_CONFIG.email} />

              <MagneticButton>
                <Button asChild variant="outline" className="group relative overflow-hidden">
                  <a href={withBasePath(SITE_CONFIG.resumeUrl)} download data-cursor="button">
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </MagneticButton>

              {/* Contact links */}
              <div className="grid grid-cols-2 gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor-hover
                    className={`group flex items-center gap-3 rounded-xl border bg-card/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${link.color}`}
                  >
                    <link.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-semibold">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Right: form ─────────────────────────── */}
          <FadeIn direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
              {/* Top gradient line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-emerald to-teal-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    >
                      <CircleCheck className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          className="mt-1.5 transition-shadow focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                          {...register("name")}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="mt-1.5 transition-shadow focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                          {...register("email")}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Project inquiry"
                        className="mt-1.5 transition-shadow focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                        {...register("subject")}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
                        className="mt-1.5 min-h-[120px] transition-shadow focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                        {...register("message")}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-400" role="alert">
                        {submitError}
                      </p>
                    )}

                    <MagneticButton className="w-full">
                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full group relative overflow-hidden"
                        disabled={isSubmitting}
                      >
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Send className="h-4 w-4" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
