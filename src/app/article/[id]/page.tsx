import { getTopHeadlines, decodeArticleId, getMockArticles } from "@/lib/api";
import { formatDateLong, getReadingTime } from "@/lib/utils";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ArticleImage } from "@/components/ArticleImage";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  let articles;
  try {
    articles = await getTopHeadlines("general", 20);
  } catch {
    articles = getMockArticles(20);
  }

  if (articles.length === 0) {
    articles = getMockArticles(20);
  }

  const articleUrl = decodeArticleId(id);
  const article = articles.find((a) => a.url === articleUrl) || articles[0];
  const related = articles.filter((a) => a.url !== article.url).slice(0, 3);
  const readTime = getReadingTime(article.content);

  return (
    <article className="animate-fade-in paper-texture">
      {/* Breadcrumb */}
      <div className="max-w-[900px] mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 text-[11px] text-muted font-serif">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent font-bold">{article.source.name}</span>
        </div>
      </div>

      {/* Header */}
      <header className="max-w-[900px] mx-auto px-4 py-6">
        <div className="rule-thick mb-4" />
        <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-serif font-bold">
          {article.source.name}
        </span>
        <h1 className="font-heading text-3xl md:text-[2.8rem] lg:text-[3.5rem] font-black leading-[1.05] tracking-tight mt-2 mb-4">
          {article.title}
        </h1>
        {article.description && (
          <p className="font-serif text-lg md:text-xl text-muted leading-relaxed mb-6 max-w-3xl">
            {article.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted font-serif pb-4 border-b border-rule-light">
          {article.author && (
            <>
              <span className="font-bold text-ink uppercase tracking-wide">{article.author}</span>
              <span className="text-rule-light">|</span>
            </>
          )}
          <span>{formatDateLong(article.publishedAt)}</span>
          <span className="text-rule-light">|</span>
          <span>{readTime} min read</span>
        </div>
      </header>

      {/* Article image */}
      {article.urlToImage && (
        <div className="max-w-[900px] mx-auto px-4 mb-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-cream">
            <ArticleImage src={article.urlToImage} alt={article.title} priority />
          </div>
          <p className="text-[10px] text-muted font-serif mt-2 italic">
            {article.source.name} / Associated Press
          </p>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[700px] mx-auto px-4 py-6">
        <div className="font-body text-[16px] leading-[1.9] text-ink/85">
          {article.content ? (
            <p className="drop-cap">{article.content}</p>
          ) : (
            <>
              <p className="drop-cap">
                {article.description || "Full article content."}
              </p>
              <p className="text-muted italic mt-8 text-[14px] border-l-2 border-accent pl-5 font-serif">
                To read the full article, visit{" "}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  the original source
                </a>
                .
              </p>
            </>
          )}
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-rule-light">
          <span className="text-[10px] tracking-[0.12em] uppercase text-muted font-serif font-bold">
            Share
          </span>
          <div className="flex gap-1.5">
            {["Twitter", "LinkedIn", "Email"].map((platform) => (
              <button
                key={platform}
                className="px-3 py-1.5 border border-rule-light text-[10px] font-serif text-muted hover:text-ink hover:border-ink transition-all duration-200"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 py-12">
          <SectionHeader title="Related Stories" accent />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
            {related.map((art, i) => (
              <div key={i} className={i > 0 ? "md:border-l md:border-rule-light md:pl-8" : ""}>
                <ArticleCard article={art} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
