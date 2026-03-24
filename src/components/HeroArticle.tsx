import Link from "next/link";
import { Article } from "@/types/news";
import { timeAgo, getReadingTime } from "@/lib/utils";
import { generateArticleId } from "@/lib/api";

interface HeroArticleProps {
  article: Article;
  secondary?: Article[];
}

export function HeroArticle({ article, secondary = [] }: HeroArticleProps) {
  const articleId = generateArticleId(article);
  const readTime = getReadingTime(article.content);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Editorial double line */}
      <div className="editorial-divider-double mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        {/* Main hero */}
        <div className="lg:col-span-3">
          <Link href={`/article/${articleId}`} className="group block">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-accent font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {article.source.name}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.06] tracking-tight mb-5 group-hover:text-accent transition-colors duration-300">
              {article.title}
            </h1>
            {article.description && (
              <p className="text-lg text-muted leading-relaxed mb-6 max-w-xl">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted/70">
              {article.author && (
                <span className="font-medium text-ink/70">{article.author}</span>
              )}
              <span>{timeAgo(article.publishedAt)}</span>
              <span>{readTime} min read</span>
            </div>
          </Link>
        </div>

        {/* Secondary articles */}
        <div className="lg:col-span-2 lg:border-l lg:border-ink/10 lg:pl-10">
          <div className="space-y-0">
            {secondary.slice(0, 4).map((art, i) => {
              const secId = generateArticleId(art);
              return (
                <Link
                  key={secId}
                  href={`/article/${secId}`}
                  className="group block py-5 border-b border-ink/8 last:border-b-0 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(i + 1) * 0.12}s` }}
                >
                  <span className="text-[10px] tracking-[0.12em] uppercase text-accent/80 font-semibold">
                    {art.source.name}
                  </span>
                  <h2 className="font-heading text-xl font-bold leading-snug mt-1.5 group-hover:text-accent transition-colors duration-300">
                    {art.title}
                  </h2>
                  <span className="text-xs text-muted mt-2 inline-block">
                    {timeAgo(art.publishedAt)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="editorial-divider mt-10" />
    </section>
  );
}
