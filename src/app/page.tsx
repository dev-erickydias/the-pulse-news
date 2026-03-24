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
  const secondaryArticles = articles.slice(1, 4);
  const gridArticles = articles.slice(4, 10);
  const trendingArticles = articles.slice(10, 16);
  const latestArticles = articles.slice(16);

  return (
    <>
      <HeroArticle article={heroArticle} secondary={secondaryArticles} />

      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.label}
              slug={cat.slug}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeader
          title="Featured"
          subtitle="Today's most important stories"
          accent
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridArticles.map((article, i) => (
            <ArticleCard key={i} article={article} index={i} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
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

          <div className="lg:col-span-2">
            <SectionHeader title="Latest News" accent />
            <div className="space-y-5">
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

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-navy p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
          </div>
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Stay in the know
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Get the top stories delivered straight to your inbox. No spam,
              just relevant content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors"
              />
              <button className="px-8 py-3 rounded-full bg-accent hover:bg-accent-dark text-white text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
