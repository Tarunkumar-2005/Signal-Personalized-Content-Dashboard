export type ContentCategory =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "science"
  | "health"
  | "gaming"
  | "business";

export type ContentSource = "news" | "recommendation" | "social";

export type RecommendationType = "movie" | "music" | "podcast" | "book";

export type SocialPlatform = "twitter" | "instagram" | "bluesky" | "linkedin";

export interface SocialMetrics {
  likes: number;
  reposts: number;
  replies: number;
  shares: number;
}

export interface ContentItem {
  id: string;
  source: ContentSource;
  category: ContentCategory;
  title: string;
  description: string;
  content?: string;
  image: string;
  ctaLabel: string;
  url: string;
  author: string;
  authorAvatar?: string;
  authorHandle?: string;
  sourceName?: string;
  sourceLogo?: string;
  publishedAt: string;
  readTimeMinutes?: number;
  trendingScore: number; // 0-100
  rating?: number; // 0-10 (for recommendations)
  mediaType?: RecommendationType;
  mediaUrl?: string;
  socialMetrics?: SocialMetrics;
  tags: string[];
}

export type SupportedLanguage = "en" | "es" | "fr" | "de" | "ja";

export type ViewMode = "grid" | "compact" | "list";

export type PaginationMode = "infinite" | "paged";

export interface UserPreferences {
  categories: ContentCategory[];
  sources: ContentSource[];
  darkMode: boolean;
  viewMode: ViewMode;
  paginationMode: PaginationMode;
  autoRefresh: boolean;
  autoRefreshIntervalSeconds: number;
  language: SupportedLanguage;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  readArticlesCount: number;
  interests: ContentCategory[];
}

export interface RealtimeNotification {
  id: string;
  type: "breaking_news" | "trending_alert" | "recommendation";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  item?: ContentItem;
}

export type FetchStatus = "idle" | "loading" | "succeeded" | "failed";
