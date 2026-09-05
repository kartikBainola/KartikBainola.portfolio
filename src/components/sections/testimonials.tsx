"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";

const avatarGradients = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-teal-500",
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-card/30 overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-80 w-[700px] rounded-full bg-accent-purple/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What People Say"
          description="Feedback from colleagues, clients, and collaborators."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => {
            const avatarGradient = avatarGradients[index % avatarGradients.length];
            return (
              <FadeIn key={testimonial.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, rotateX: 1, rotateY: 1 }}
                  style={{ transformStyle: "preserve-3d", perspective: 800 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent-blue/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] gradient-border-hover"
                >
                  {/* Gradient top accent */}
                  <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${avatarGradient} opacity-0 transition-opacity group-hover:opacity-100`} />

                  {/* Large decorative quote */}
                  <div className="pointer-events-none absolute -right-3 -top-3 select-none">
                    <Quote className="h-24 w-24 text-accent-blue/6 rotate-180" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="relative text-sm text-muted-foreground leading-relaxed italic sm:text-base">
                    <span className="font-bold text-foreground/20 text-xl mr-0.5">&ldquo;</span>
                    {testimonial.content}
                    <span className="font-bold text-foreground/20 text-xl ml-0.5">&rdquo;</span>
                  </blockquote>

                  {/* Author */}
                  <div className="mt-7 flex items-center gap-3.5">
                    {/* Avatar with gradient ring */}
                    <div className={`relative h-11 w-11 rounded-full bg-gradient-to-br ${avatarGradient} p-0.5 shadow-lg`}>
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-card text-sm font-black text-foreground">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>

                    {/* Rating pill */}
                    <div className="ml-auto flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/8 px-2.5 py-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-amber-400">{testimonial.rating}.0</span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
