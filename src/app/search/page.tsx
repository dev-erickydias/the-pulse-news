import { searchNews, getMockArticles } from "@/lib/api";
import { Article } from "@/types/news";
import { ArticleCard } from "@/components/ArticleCard";
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
  }

  return (
    <div className="animate-fade-in paper-texture">
      {/* Header */}
      <section className="max-w-[1200px] mx-auto px-4 pt-8 pb-4">
        <div className="rule-thick mb-4" />
        {query ? (
          <>
            <span className="text-[10px] tracking-[0.15em] uppercase text-muted font-serif font-bold">
              Search Results
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-black tracking-tight mt-1">
              &ldquo;{query}&rdquo;
            </h1>
            <p className="text-[12px] text-muted font-serif mt-2">
              {articles.length} results found
            </p>
          </>
        ) : (
          <>
            <h1 className="font-heading text-3xl md:text-5xl font-black tracking-tight uppercase">
              Search
            </h1>
            <p className="text-[12px] text-muted font-serif mt-2">
              Use the search bar above to find news
            </p>
          </>
        )}
        <div className="rule-thin mt-4" />
      </section>

      {/* Results */}
      <section className="max-w-[1200px] mx-auto px-4 py-6">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {articles.map((article, i) => (
              <div key={i} className={`${(i % 3 !== 0) ? "lg:border-l lg:border-rule-light lg:pl-8" : ""}`}>
                <ArticleCard article={article} index={i} />
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <h2 className="font-heading text-2xl font-black mb-2">
              No results found
            </h2>
            <p className="text-muted font-serif text-sm mb-6">
              Try searching for different terms
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-ink text-paper text-[11px] font-serif font-bold tracking-[0.12em] uppercase hover:bg-accent transition-colors"
            >
              Back to Front Page
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}
