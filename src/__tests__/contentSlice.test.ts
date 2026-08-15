import contentReducer, {
  reorderFeed,
  resetFeedOrder,
  setFeedSortBy,
  setFeedSourceFilter,
  setSearchQuery,
  receiveLiveItem,
  applyPendingLiveItems,
} from "@/store/slices/contentSlice";
import type { ContentItem } from "@/types";

const makeItem = (id: string): ContentItem => ({
  id,
  source: "news",
  category: "technology",
  title: `Title ${id}`,
  description: "Description",
  image: "https://example.com/img.jpg",
  ctaLabel: "Read",
  url: "#",
  author: "Author",
  publishedAt: new Date().toISOString(),
  trendingScore: 75,
  tags: [],
});

describe("contentSlice", () => {
  const initial = {
    feed: [makeItem("1"), makeItem("2"), makeItem("3")],
    originalFeed: [makeItem("1"), makeItem("2"), makeItem("3")],
    feedPage: 1,
    feedStatus: "succeeded" as const,
    feedError: null,
    hasMore: true,
    totalPages: 5,
    selectedSourceFilter: "all" as const,
    sortBy: "newest" as const,
    trending: [],
    trendingStatus: "idle" as const,
    searchQuery: "",
    searchResults: [],
    searchStatus: "idle" as const,
    searchHistory: [],
    pendingLiveItems: [],
  };

  it("reorders feed cards correctly", () => {
    const state = contentReducer(
      initial,
      reorderFeed({ fromId: "1", toId: "3" })
    );
    expect(state.feed.map((i) => i.id)).toEqual(["2", "3", "1"]);
  });

  it("resets feed to original order", () => {
    const reordered = contentReducer(
      initial,
      reorderFeed({ fromId: "1", toId: "3" })
    );
    const reset = contentReducer(reordered, resetFeedOrder());
    expect(reset.feed.map((i) => i.id)).toEqual(["1", "2", "3"]);
  });

  it("updates sort option and source filter", () => {
    let state = contentReducer(initial, setFeedSortBy("trending"));
    expect(state.sortBy).toBe("trending");

    state = contentReducer(state, setFeedSourceFilter("social"));
    expect(state.selectedSourceFilter).toBe("social");
  });

  it("receives and applies live stream items", () => {
    const newItem = makeItem("live-99");
    let state = contentReducer(initial, receiveLiveItem(newItem));
    expect(state.pendingLiveItems).toHaveLength(1);

    state = contentReducer(state, applyPendingLiveItems());
    expect(state.pendingLiveItems).toHaveLength(0);
    expect(state.feed[0].id).toBe("live-99");
  });
});
