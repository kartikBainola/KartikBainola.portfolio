"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, Mail, Phone, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
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

  const links = [
    { label: "Email", href: SOCIAL_LINKS.email, icon: Mail },
    { label: "Phone", href: SOCIAL_LINKS.phone, icon: Phone },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedInIcon },
    { label: "GitHub", href: SOCIAL_LINKS.github, icon: GitHubIcon },
  ];

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="font-sans text-xs tracking-[0.16em] text-accent uppercase">Contact</p>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">Start a conversation.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            For a Flutter product, a release, or a question about the work on this site.
          </p>
          <p className="mt-6 font-sans text-sm text-muted-foreground">{profileLocation()}</p>

          <div className="mt-8 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex min-h-11 max-w-full items-center gap-3 font-sans text-sm text-foreground transition-colors duration-200 hover:text-accent"
              >
                <link.icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent" />
                <span className="min-w-0 break-all">
                  {link.label === "Email" ? SITE_CONFIG.email : link.label === "Phone" ? SITE_CONFIG.phone : link.label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CopyEmailButton email={SITE_CONFIG.email} />
            <Button asChild variant="secondary">
              <a href={withBasePath(SITE_CONFIG.resumeUrl)} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80} className="rounded-2xl border border-border bg-card p-5 sm:p-8">
          {isSubmitted ? (
            <div className="flex min-h-64 flex-col justify-center">
              <h3 className="text-3xl">Message sent.</h3>
              <p className="mt-3 text-sm text-muted-foreground">Thanks for writing. I will read it and reply by email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name?.message}>
                  <Input id="name" autoComplete="name" {...register("name")} />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                  <Input id="email" type="email" autoComplete="email" {...register("email")} />
                </Field>
              </div>
              <Field id="subject" label="Subject" error={errors.subject?.message}>
                <Input id="subject" {...register("subject")} />
              </Field>
              <Field id="message" label="Message" error={errors.message?.message}>
                <Textarea id="message" className="min-h-32" {...register("message")} />
              </Field>
              {submitError && (
                <p className="text-sm text-accent-rose" role="alert">
                  {submitError}
                </p>
              )}
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function profileLocation() {
  return `${SITE_CONFIG.location}`;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="font-sans text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-accent-rose">{error}</p>}
    </div>
  );
}
