import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

const posts = getAllPosts().slice(0, 3);

export function BlogPreviewSection() {
  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="Latest Articles"
          description="Insights on Flutter development, architecture, and mobile engineering."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent-blue/30 hover:glow-blue"
              >
                <div className="mb-4 h-28 rounded-xl bg-gradient-to-br from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20" />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                  {post.tags[0] && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-bold transition-colors group-hover:text-accent-blue">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent-blue transition-transform group-hover:translate-x-0.5">
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <Button asChild variant="secondary">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
