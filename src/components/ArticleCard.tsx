import Link from "next/link";
import { Article } from "@/types/news";
import { timeAgo, getReadingTime } from "@/lib/utils";
import { generateArticleId } from "@/lib/api";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "horizontal";
  index?: number;
}

export function ArticleCard({
  article,
  variant = "default",
  index = 0,
}: ArticleCardProps) {
  const articleId = generateArticleId(article);
  const readTime = getReadingTime(article.content);

  if (variant === "horizontal") {
    return (
      <Link
        href={`/article/${articleId}`}
        className="group flex gap-4 items-start opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="shrink-0 w-8 h-8 rounded-full bg-accent/8 flex items-center justify-center mt-0.5">
          <span className="text-[10px] font-bold text-accent font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
        <div className="min-w-0">
          <span className="text-[11px] tracking-[0.1em] uppercase text-accent font-medium">
            {article.source.name}
          </span>
          <h3 className="font-heading text-base font-bold leading-snug line-clamp-2 mt-1 group-hover:text-accent transition-colors duration-300">
            {article.title}
          </h3>
          <span className="text-xs text-muted mt-1.5 inline-block">
            {timeAgo(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${articleId}`}
        className="group block opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start gap-4 py-5 border-b border-ink/8">
          <span className="font-heading text-3xl font-bold text-ink/10 shrink-0 leading-none pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="text-[11px] tracking-[0.1em] uppercase text-accent font-medium">
              {article.source.name}
            </span>
            <h3 className="font-heading text-lg font-bold leading-snug mt-1 group-hover:text-accent transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Default card - editorial text-only style
  return (
    <Link
      href={`/article/${articleId}`}
      className="group block card-hover opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="p-6 rounded-2xl border border-ink/6 bg-cream/30 hover:bg-cream/60 transition-all duration-400 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-accent/10 text-accent text-[10px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 rounded-full">
            {article.source.name}
          </span>
          <span className="text-[11px] text-muted font-mono">
            {readTime} min
          </span>
        </div>

        <h3 className="font-heading text-xl font-bold leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4 flex-1">
          {article.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-muted/60 pt-4 border-t border-ink/6">
          {article.author && (
            <>
              <span className="font-medium text-ink/60">{article.author}</span>
              <span>&#x2022;</span>
            </>
          )}
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
