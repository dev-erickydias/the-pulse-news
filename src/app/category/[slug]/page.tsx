import { getTopHeadlines, getMockArticles } from "@/lib/api";
import { Category, CATEGORIES } from "@/types/news";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryPill } from "@/components/CategoryPill";

export const revalidate = 600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const categoryName = category?.label || slug;

  let articles;
  try {
    articles = await getTopHeadlines(slug as Category, 18);
  } catch {
    articles = getMockArticles(18, slug);
  }

  if (articles.length === 0) {
    articles = getMockArticles(18, slug);
  }

  return (
    <div className="animate-fade-in paper-texture">
      {/* Header */}
      <section className="max-w-[1200px] mx-auto px-4 pt-8 pb-4">
        <div className="rule-thick mb-4" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-serif font-bold">
              Section
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight uppercase">
              {categoryName}
            </h1>
          </div>
          <p className="text-[12px] text-muted font-serif">
            {articles.length} articles
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-2">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.label}
              slug={cat.slug}
              active={cat.slug === slug}
            />
          ))}
        </div>
        <div className="rule-thin mt-4" />
      </section>

      {/* Grid */}
      <section className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {articles.map((article, i) => (
            <div key={i} className={`${(i % 3 !== 0) ? "lg:border-l lg:border-rule-light lg:pl-8" : ""}`}>
              <ArticleCard article={article} index={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
