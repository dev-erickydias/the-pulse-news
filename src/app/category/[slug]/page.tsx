import { getTopHeadlines, getMockArticles } from "@/lib/api";
import { Category, CATEGORIES } from "@/types/news";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
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
    articles = getMockArticles(18);
  }

  if (articles.length === 0) {
    articles = getMockArticles(18);
  }

  return (
    <div className="animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-accent/10 text-accent text-[11px] tracking-[0.15em] uppercase font-bold px-3 py-1 rounded-full mb-4">
            Category
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight">
            {categoryName}
          </h1>
          <p className="text-muted mt-3">
            {articles.length} articles found
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.slug}
              label={cat.label}
              slug={cat.slug}
              active={cat.slug === slug}
            />
          ))}
        </div>
      </section>

      <div className="editorial-divider max-w-7xl mx-auto" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
