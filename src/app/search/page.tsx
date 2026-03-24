import { searchNews, getMockArticles } from "@/lib/api";
import { Article } from "@/types/news";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || "";

  let articles: Article[] = [];
  if (query) {
    try {
      articles = await searchNews(query, 18);
    } catch {
      articles = getMockArticles(12);
    }
  } else {
    articles = [];
  }

  return (
    <div className="animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-8">
        <div className="text-center">
          <span className="inline-block bg-ink/5 text-muted text-[11px] tracking-[0.15em] uppercase font-bold px-3 py-1 rounded-full mb-4">
            Search Results
          </span>
          {query ? (
            <>
              <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
                &ldquo;{query}&rdquo;
              </h1>
              <p className="text-muted mt-3">
                {articles.length} results found
              </p>
            </>
          ) : (
            <>
              <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
                Search News
              </h1>
              <p className="text-muted mt-3">
                Use the search bar above to find news
              </p>
            </>
          )}
        </div>
      </section>

      <div className="editorial-divider max-w-7xl mx-auto" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <ArticleCard key={i} article={article} index={i} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-20">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="mx-auto"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-2">
              No results found
            </h2>
            <p className="text-muted mb-6">
              Try searching for different terms
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-ink text-paper text-sm font-medium hover:bg-ink/80 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
