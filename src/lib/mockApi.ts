import { generateMockItem, generateMockItems, searchMockItems } from "@/lib/mockData";
import type { ContentCategory, ContentItem, ContentSource } from "@/types";

const NETWORK_DELAY_MS = 300;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

export async function fetchContentPage(
  page: number,
  pageSize: number,
  categories: ContentCategory[] = [],
  sources: ContentSource[] = []
): Promise<ContentItem[]> {
  const items = generateMockItems(page, pageSize, categories, sources);
  return delay(items);
}

export async function fetchTrending(
  categories: ContentCategory[] = [],
  sources: ContentSource[] = []
): Promise<ContentItem[]> {
  const pool = generateMockItems(0, 30, categories, sources);
  const sorted = [...pool].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 8);
  return delay(sorted);
}

export async function searchContent(
  query: string,
  categories: ContentCategory[] = [],
  sources: ContentSource[] = []
): Promise<ContentItem[]> {
  const results = searchMockItems(query, categories, sources);
  return delay(results);
}

let liveCounter = 100;
export function fetchNextLiveItem(
  categories: ContentCategory[] = [],
  sources: ContentSource[] = []
): ContentItem {
  liveCounter += 1;
  const item = generateMockItem(liveCounter, categories, sources);
  item.publishedAt = new Date().toISOString();
  return item;
}
