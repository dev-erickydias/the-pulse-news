import { getTopHeadlines, getMockArticles } from "@/lib/api";
import { HeroArticle } from "@/components/HeroArticle";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryPill } from "@/components/CategoryPill";
import { CATEGORIES } from "@/types/news";

export const revalidate = 600;

export default async function HomePage() {
  let articles;
  try {
    articles = await getTopHeadlines("general", 20);
  } catch {
    articles = getMockArticles(20);
  }

  if (articles.length === 0) {
    articles = getMockArticles(20);
  }

  const heroArticle = articles[0];
  const secondaryArticles = articles.slice(1, 8);
  const gridArticles = articles.slice(8, 14);
  const trendingArticles = articles.slice(14, 18);
  const latestArticles = articles.slice(18);

  return (
    <div className="paper-texture">
      {/* Hero — newspaper above-the-fold */}
      <HeroArticle article={heroArticle} secondary={secondaryArticles} />

      {/* Category bar */}
      <section className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.label}
              slug={cat.slug}
            />
          ))}
        </div>
      </section>

      {/* Feature grid — newspaper columns */}
      <section className="max-w-[1200px] mx-auto px-4 py-6">
        <SectionHeader
          title="Featured"
          subtitle="Today&apos;s most important stories"
          accent
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {gridArticles.map((article, i) => (
            <div key={i} className={i > 0 ? "lg:border-l lg:border-rule-light lg:pl-8" : ""}>
              <ArticleCard article={article} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Trending + Latest — two column newspaper layout */}
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="rule-thick mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Trending */}
          <div className="lg:col-span-8 lg:pr-8">
            <SectionHeader title="Trending" accent />
            <div className="space-y-0">
              {trendingArticles.map((article, i) => (
                <ArticleCard
                  key={i}
                  article={article}
                  variant="compact"
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Latest sidebar */}
          <div className="lg:col-span-4 lg:border-l lg:border-rule-light lg:pl-8 mt-8 lg:mt-0">
            <SectionHeader title="Bulletin" accent />
            <div className="space-y-0">
              {latestArticles.map((article, i) => (
                <ArticleCard
                  key={i}
                  article={article}
                  variant="horizontal"
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter — newspaper classified ad style */}
      <section className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="border-2 border-ink p-8 md:p-12 text-center bg-cream/50">
          <h2 className="font-heading text-2xl md:text-3xl font-black tracking-tight mb-2 uppercase">
            Subscribe to Our Edition
          </h2>
          <div className="w-16 h-[2px] bg-ink mx-auto mb-4" />
          <p className="font-serif text-[13px] text-muted mb-6 max-w-md mx-auto leading-relaxed">
            Receive the morning&apos;s top headlines delivered directly to your inbox.
            Quality journalism, every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 border border-ink/30 bg-paper text-sm font-serif placeholder:text-muted/40 focus:outline-none focus:border-ink transition-colors"
            />
            <button className="px-6 py-2.5 bg-ink text-paper text-[11px] font-serif font-bold tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
