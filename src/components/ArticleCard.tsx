import Link from "next/link";
import { Article } from "@/types/news";
import { timeAgo, getReadingTime } from "@/lib/utils";
import { generateArticleId } from "@/lib/api";
import { ArticleImage } from "./ArticleImage";

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

  // Horizontal — sidebar style with number
  if (variant === "horizontal") {
    return (
      <Link
        href={`/article/${articleId}`}
        className="group flex gap-3 items-start opacity-0 animate-fade-in-up pb-4 mb-4 border-b border-rule-light last:border-b-0"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        <span className="shrink-0 font-heading text-2xl font-black text-ink/10 leading-none pt-0.5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] tracking-[0.08em] uppercase text-accent font-serif font-bold">
              {article.source.name}
            </span>
            <span className="text-[10px] text-muted font-serif">
              {timeAgo(article.publishedAt)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Compact — trending list with image thumb
  if (variant === "compact") {
    return (
      <Link
        href={`/article/${articleId}`}
        className="group block opacity-0 animate-fade-in-up"
        style={{ animationDelay: `${index * 0.08}s` }}
      >
        <div className="flex items-start gap-4 py-4 border-b border-rule-light">
          <span className="font-heading text-3xl font-black text-ink/8 shrink-0 leading-none pt-0.5 w-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] tracking-[0.1em] uppercase text-accent font-serif font-bold">
              {article.source.name}
            </span>
            <h3 className="font-heading text-lg font-bold leading-snug mt-1 group-hover:text-accent transition-colors duration-200">
              {article.title}
            </h3>
            <p className="font-body text-[13px] text-muted mt-1 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          </div>
          {article.urlToImage && (
            <div className="relative w-20 h-20 shrink-0 overflow-hidden hidden sm:block">
              <ArticleImage src={article.urlToImage} alt={article.title} />
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Default — newspaper column card with image
  return (
    <Link
      href={`/article/${articleId}`}
      className="group block opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <article className="h-full">
        {/* Image */}
        {article.urlToImage && (
          <div className="relative w-full aspect-[3/2] mb-3 overflow-hidden bg-cream">
            <ArticleImage
              src={article.urlToImage}
              alt={article.title}
              className="group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* Source tag */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] tracking-[0.12em] uppercase text-accent font-serif font-bold">
            {article.source.name}
          </span>
          <span className="text-[10px] text-muted font-mono">
            {readTime} min
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-heading text-xl font-bold leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
          {article.title}
        </h3>

        {/* Description */}
        <p className="font-body text-[13px] text-muted leading-relaxed line-clamp-3 mb-3">
          {article.description}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-2 text-[10px] text-muted/70 font-serif pt-3 border-t border-rule-light">
          {article.author && (
            <>
              <span className="font-bold text-ink/50 uppercase tracking-wide">{article.author}</span>
              <span>&middot;</span>
            </>
          )}
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </article>
    </Link>
  );
}
