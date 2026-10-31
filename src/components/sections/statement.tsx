import { profile } from "@/data/profile";

export function StatementSection() {
  return (
    <section className="px-4 py-16 sm:px-8 sm:py-20 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="display-heading font-sans text-[clamp(2.15rem,8vw,5.5rem)] leading-none font-semibold tracking-tight uppercase">
          Focus
        </h2>
        <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.about.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
