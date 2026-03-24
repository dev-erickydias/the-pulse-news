import { getTopHeadlines, decodeArticleId, generateArticleId, getMockArticles } from "@/lib/api";
import { formatDateLong, getReadingTime } from "@/lib/utils";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
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
    <article className="animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent">{article.source.name}</span>
        </div>
      </div>

      <header className="max-w-4xl mx-auto px-4 py-8">
        <span className="inline-block bg-accent/10 text-accent text-[11px] tracking-[0.12em] uppercase font-bold px-3 py-1 rounded-full mb-5">
          {article.source.name}
        </span>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6">
          {article.title}
        </h1>
        {article.description && (
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-3xl">
            {article.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted pb-8 border-b border-ink/10">
          {article.author && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
                <span className="text-xs font-bold text-ink/60">
                  {article.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-ink">{article.author}</span>
            </div>
          )}
          <span className="text-muted/50">|</span>
          <span>{formatDateLong(article.publishedAt)}</span>
          <span className="text-muted/50">|</span>
          <span>{readTime} min read</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-lg prose-stone max-w-none font-body leading-[1.85] text-ink/85">
          {article.content ? (
            <p>{article.content}</p>
          ) : (
            <>
              <p>
                {article.description || "Full article content."}
              </p>
              <p className="text-muted italic mt-8 text-base border-l-2 border-accent pl-6">
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

        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-ink/10">
          <span className="text-xs tracking-[0.1em] uppercase text-muted font-medium">
            Share
          </span>
          <div className="flex gap-2">
            {["Twitter", "LinkedIn", "Email"].map((platform) => (
              <button
                key={platform}
                className="px-4 py-2 rounded-full border border-ink/10 text-xs text-muted hover:text-ink hover:border-ink/30 transition-all duration-300"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeader title="Related Stories" accent />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((art, i) => (
              <ArticleCard key={i} article={art} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
