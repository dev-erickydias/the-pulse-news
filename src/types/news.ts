export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type Category =
  | "general"
  | "business"
  | "technology"
  | "science"
  | "health"
  | "sports"
  | "entertainment";

export const CATEGORIES: { slug: Category; label: string; icon: string }[] = [
  { slug: "general", label: "General", icon: "globe" },
  { slug: "business", label: "Business", icon: "trending-up" },
  { slug: "technology", label: "Technology", icon: "cpu" },
  { slug: "science", label: "Science", icon: "flask" },
  { slug: "health", label: "Health", icon: "heart" },
  { slug: "sports", label: "Sports", icon: "trophy" },
  { slug: "entertainment", label: "Entertainment", icon: "film" },
];
