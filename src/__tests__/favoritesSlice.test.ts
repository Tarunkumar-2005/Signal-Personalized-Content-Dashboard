import favoritesReducer, {
  addFavorite,
  clearAllFavorites,
  removeFavorite,
  toggleFavorite,
} from "@/store/slices/favoritesSlice";
import type { ContentItem } from "@/types";

const mockItem: ContentItem = {
  id: "technology-news-0",
  source: "news",
  category: "technology",
  title: "Test headline",
  description: "Test description",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  ctaLabel: "Read Story",
  url: "#",
  author: "Test Author",
  publishedAt: new Date().toISOString(),
  readTimeMinutes: 3,
  trendingScore: 50,
  tags: ["Tech"],
};

describe("favoritesSlice", () => {
  const initialState = {
    items: [],
    selectedCategoryFilter: "all" as const,
    selectedSourceFilter: "all" as const,
    searchQuery: "",
  };

  it("adds an item that is not yet a favorite", () => {
    const state = favoritesReducer(initialState, toggleFavorite(mockItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(mockItem.id);
  });

  it("removes an item that is already a favorite", () => {
    const state = favoritesReducer(
      { ...initialState, items: [mockItem] },
      toggleFavorite(mockItem)
    );
    expect(state.items).toHaveLength(0);
  });

  it("clears all favorites", () => {
    const state = favoritesReducer(
      { ...initialState, items: [mockItem] },
      clearAllFavorites()
    );
    expect(state.items).toHaveLength(0);
  });
});
