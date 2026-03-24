import { Article, NewsResponse, Category } from "@/types/news";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || "";
const BASE_URL = "https://newsapi.org/v2";

async function fetchNews(endpoint: string, params: Record<string, string> = {}): Promise<NewsResponse> {
  const searchParams = new URLSearchParams({
    apiKey: API_KEY,
    ...params,
  });

  const res = await fetch(`${BASE_URL}/${endpoint}?${searchParams}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch news: ${res.status}`);
  }

  return res.json();
}

export async function getTopHeadlines(
  category: Category = "general",
  pageSize: number = 20,
  country: string = "us"
): Promise<Article[]> {
  const data = await fetchNews("top-headlines", {
    category,
    pageSize: String(pageSize),
    country,
  });
  return data.articles.filter((a) => a.title !== "[Removed]");
}

export async function searchNews(
  query: string,
  pageSize: number = 20
): Promise<Article[]> {
  const data = await fetchNews("everything", {
    q: query,
    pageSize: String(pageSize),
    sortBy: "publishedAt",
    language: "en",
  });
  return data.articles.filter((a) => a.title !== "[Removed]");
}

export function generateArticleId(article: Article): string {
  return Buffer.from(article.url).toString("base64url");
}

export function decodeArticleId(id: string): string {
  return Buffer.from(id, "base64url").toString("utf-8");
}

// Mock images from picsum for fallback
const MOCK_IMAGES = [
  "https://picsum.photos/seed/news1/800/500",
  "https://picsum.photos/seed/news2/800/500",
  "https://picsum.photos/seed/news3/800/500",
  "https://picsum.photos/seed/news4/800/500",
  "https://picsum.photos/seed/news5/800/500",
  "https://picsum.photos/seed/news6/800/500",
  "https://picsum.photos/seed/news7/800/500",
  "https://picsum.photos/seed/news8/800/500",
  "https://picsum.photos/seed/news9/800/500",
  "https://picsum.photos/seed/news10/800/500",
  "https://picsum.photos/seed/news11/800/500",
  "https://picsum.photos/seed/news12/800/500",
];

export function getMockArticles(count: number = 12): Article[] {
  const mockArticles: Article[] = Array.from({ length: count }, (_, i) => ({
    source: {
      id: null,
      name: ["Reuters", "BBC News", "The Guardian", "Bloomberg", "TechCrunch", "The Washington Post"][i % 6],
    },
    author: ["John Smith", "Maria Garcia", "Alex Chen", "Sarah Johnson", "David Kim", "Emma Wilson"][i % 6],
    title: [
      "Global Markets Rally as Economic Data Exceeds Expectations",
      "Breakthrough in Quantum Computing Could Transform Industry",
      "Climate Summit: World Leaders Agree on New Emissions Targets",
      "AI Revolution: How Machine Learning Is Reshaping Healthcare",
      "Space Exploration: New Mission to Mars Announces Launch Date",
      "Olympic Committee Reveals Host City for 2036 Games",
      "Tech Giants Report Record Quarterly Earnings Amid AI Boom",
      "Renewable Energy Now Cheaper Than Fossil Fuels in Most Markets",
      "Archaeological Discovery Rewrites Ancient Civilization Timeline",
      "Cybersecurity Alert: Major Vulnerability Found in Popular Software",
      "Global Food Innovation: Lab-Grown Meat Gets Regulatory Approval",
      "Electric Vehicle Sales Surge as New Models Hit the Market",
    ][i % 12],
    description: [
      "Markets around the world saw significant gains as recent economic indicators pointed to stronger-than-expected growth across multiple sectors.",
      "Scientists have achieved a major milestone in quantum computing, demonstrating practical applications that could revolutionize data processing.",
      "In a historic agreement, world leaders committed to aggressive new carbon reduction targets at the annual climate summit.",
      "From diagnosis to drug discovery, artificial intelligence is fundamentally changing how medicine approaches patient care.",
      "The international space agency has confirmed a launch window for the most ambitious Mars mission yet attempted.",
      "After months of deliberation, the IOC has selected the host city for the 2036 Summer Olympic Games.",
      "Major technology companies have reported unprecedented revenue growth, driven largely by investments in AI infrastructure.",
      "A comprehensive new report shows renewable energy costs have fallen below fossil fuels in the majority of global markets.",
      "An extraordinary archaeological find is challenging established timelines for early human civilizations.",
      "Security researchers have identified a critical vulnerability affecting millions of users worldwide.",
      "After years of development, lab-grown meat products have received full regulatory approval for commercial sale.",
      "Electric vehicle adoption continues to accelerate as automakers introduce compelling new models at competitive prices.",
    ][i % 12],
    url: `https://example.com/article-${i + 1}`,
    urlToImage: MOCK_IMAGES[i % MOCK_IMAGES.length],
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    content: "Full article content would appear here. This is placeholder content for the mock data used when no API key is configured. The story continues with detailed analysis and expert commentary on the implications of these developments for the broader market and global economy.",
  }));
  return mockArticles;
}
