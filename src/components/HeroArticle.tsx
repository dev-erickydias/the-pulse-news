import Link from "next/link";
import { Article } from "@/types/news";
import { timeAgo, getReadingTime } from "@/lib/utils";
import { generateArticleId } from "@/lib/api";
import { ArticleImage } from "./ArticleImage";

interface HeroArticleProps {
  article: Article;
  secondary?: Article[];
}

export function HeroArticle({ article, secondary = [] }: HeroArticleProps) {
  const articleId = generateArticleId(article);
  const readTime = getReadingTime(article.content);

  return (
    <section className="max-w-[1200px] mx-auto px-4 pt-6 pb-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Main headline — left column */}
        <div className="lg:col-span-5 lg:pr-6">
          <Link href={`/article/${articleId}`} className="group block">
            {/* Hero image */}
            {article.urlToImage && (
              <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden">
                <ArticleImage
                  src={article.urlToImage}
                  alt={article.title}
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
            <h1 className="font-heading text-[2rem] md:text-[2.5rem] lg:text-[2.8rem] font-black leading-[1.05] tracking-tight mb-3 group-hover:text-accent transition-colors duration-200">
              {article.title}
            </h1>
            {article.description && (
              <p className="font-body text-[15px] text-ink/70 leading-relaxed mb-3 line-clamp-4">
                {article.description}
              </p>
            )}
            <div className="flex items-center gap-3 text-[11px] text-muted uppercase tracking-wide font-serif">
              {article.author && (
                <>
                  <span className="font-bold">{article.author}</span>
                  <span className="text-rule-light">|</span>
                </>
              )}
              <span>{timeAgo(article.publishedAt)}</span>
              <span className="text-rule-light">|</span>
              <span>{readTime} min read</span>
            </div>
          </Link>
        </div>

        {/* Center column — secondary stories stacked */}
        <div className="lg:col-span-4 lg:border-l lg:border-r lg:border-rule-light lg:px-6 mt-6 lg:mt-0">
          {secondary.slice(0, 3).map((art, i) => {
            const secId = generateArticleId(art);
            return (
              <Link
                key={secId}
                href={`/article/${secId}`}
                className={`group block pb-4 mb-4 opacity-0 animate-fade-in-up ${
                  i < 2 ? "border-b border-rule-light" : ""
                }`}
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
              >
                {/* Show image for first secondary article */}
                {i === 0 && art.urlToImage && (
                  <div className="relative w-full aspect-[16/9] mb-3 overflow-hidden">
                    <ArticleImage src={art.urlToImage} alt={art.title} />
                  </div>
                )}
                <span className="text-[10px] tracking-[0.12em] uppercase text-accent font-serif font-bold">
                  {art.source.name}
                </span>
                <h2 className="font-heading text-lg font-bold leading-snug mt-1 group-hover:text-accent transition-colors duration-200">
                  {art.title}
                </h2>
                {i === 0 && art.description && (
                  <p className="font-body text-[13px] text-muted leading-relaxed mt-1.5 line-clamp-2">
                    {art.description}
                  </p>
                )}
                <span className="text-[10px] text-muted mt-1.5 inline-block font-serif">
                  {timeAgo(art.publishedAt)}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right column — brief headlines */}
        <div className="lg:col-span-3 lg:pl-6 mt-6 lg:mt-0">
          <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted font-serif font-bold mb-3 pb-2 border-b-2 border-ink">
            Latest Headlines
          </h3>
          {secondary.slice(3, 7).map((art, i) => {
            const secId = generateArticleId(art);
            return (
              <Link
                key={secId}
                href={`/article/${secId}`}
                className={`group block pb-3 mb-3 opacity-0 animate-fade-in-up ${
                  i < 3 ? "border-b border-rule-light" : ""
                }`}
                style={{ animationDelay: `${(i + 2) * 0.1}s` }}
              >
                <h3 className="font-heading text-[15px] font-bold leading-snug group-hover:text-accent transition-colors duration-200">
                  {art.title}
                </h3>
                <span className="text-[10px] text-muted font-serif mt-1 inline-block">
                  {art.source.name} &middot; {timeAgo(art.publishedAt)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rule-thin mt-6" />
    </section>
  );
}
