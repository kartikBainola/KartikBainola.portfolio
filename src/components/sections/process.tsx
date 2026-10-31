"use client";

import { Reveal } from "@/components/animations/reveal";

const principles = [
  {
    title: "Scalable architecture",
    body: "Ventuera records Riverpod. My Professional Rewards records Bloc. ResoluteAI records both. Clean architecture is named on CAPTO.",
  },
  {
    title: "Maintainable UI",
    body: "Responsive layouts and reusable widgets are part of the ValueVertex and Mindrops notes, with custom animations recorded at ResoluteAI.",
  },
  {
    title: "API integration",
    body: "REST APIs are recorded on Ventuera, CAPTO, and My Professional Rewards. Firebase is recorded on Ventuera and CAPTO.",
  },
  {
    title: "Performance work",
    body: "Performance optimization is named on Ventuera, CAPTO, My Professional Rewards, and the ResoluteAI role. No benchmark numbers are stored here.",
  },
  {
    title: "Production releases",
    body: "Ventuera and My Professional Rewards have Play Store and App Store listings. CAPTO has a Play Store listing. Mindrops notes include store releases.",
  },
  {
    title: "Defect fixing",
    body: "Bug fixes are recorded on My Professional Rewards. A test plan or coverage figure is not documented, so this site does not claim a testing practice beyond that.",
  },
];

export function ProcessSection() {
  return (
    <section id="approach" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs tracking-[0.16em] text-accent uppercase">Engineering approach</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3rem)]">How the recorded work was built</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Each point is tied to a project or role already on this site.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item, index) => (
            <li key={item.title} className="min-w-0 bg-card p-5 sm:p-7">
              <Reveal delay={index * 70} className="h-full">
              <p className="font-sans text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
