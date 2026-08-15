import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchContentPage, fetchTrending, searchContent } from "@/lib/mockApi";
import type { RootState } from "@/store/store";
import type { ContentItem, ContentSource, FetchStatus } from "@/types";

export type SortOption = "newest" | "trending" | "topRated" | "mostDiscussed";

export interface ContentState {
  feed: ContentItem[];
  originalFeed: ContentItem[];
  feedPage: number;
  feedStatus: FetchStatus;
  feedError: string | null;
  hasMore: boolean;
  totalPages: number;
  selectedSourceFilter: ContentSource | "all";
  sortBy: SortOption;

  trending: ContentItem[];
  trendingStatus: FetchStatus;

  searchQuery: string;
  searchResults: ContentItem[];
  searchStatus: FetchStatus;
  searchHistory: string[];

  pendingLiveItems: ContentItem[];
}

const PAGE_SIZE = 9;

const initialState: ContentState = {
  feed: [],
  originalFeed: [],
  feedPage: 0,
  feedStatus: "idle",
  feedError: null,
  hasMore: true,
  totalPages: 5,
  selectedSourceFilter: "all",
  sortBy: "newest",

  trending: [],
  trendingStatus: "idle",

  searchQuery: "",
  searchResults: [],
  searchStatus: "idle",
  searchHistory: ["Next.js", "AI Models", "Quantum", "Champions League", "Space Telescope"],

  pendingLiveItems: [],
};

export const loadFeedPage = createAsyncThunk<
  { items: ContentItem[]; page: number; isReset: boolean },
  { reset?: boolean; targetPage?: number } | void,
  { state: RootState }
>("content/loadFeedPage", async (arg, { getState }) => {
  const isReset = arg?.reset ?? false;
  const targetPage = arg?.targetPage !== undefined ? arg.targetPage : isReset ? 0 : getState().content.feedPage;
  const categories = getState().preferences.categories;
  const sources = getState().preferences.sources;

  const items = await fetchContentPage(targetPage, PAGE_SIZE, categories, sources);
  return { items, page: targetPage, isReset };
});

export const loadTrending = createAsyncThunk<
  ContentItem[],
  void,
  { state: RootState }
>("content/loadTrending", async (_, { getState }) => {
  const categories = getState().preferences.categories;
  const sources = getState().preferences.sources;
  return await fetchTrending(categories, sources);
});

export const executeSearch = createAsyncThunk<
  ContentItem[],
  string,
  { state: RootState }
>("content/executeSearch", async (query, { getState }) => {
  if (!query.trim()) return [];
  const categories = getState().preferences.categories;
  const sources = getState().preferences.sources;
  return await searchContent(query, categories, sources);
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (!action.payload.trim()) {
        state.searchResults = [];
        state.searchStatus = "idle";
      }
    },
    addSearchHistory(state, action: PayloadAction<string>) {
      const q = action.payload.trim();
      if (q && !state.searchHistory.includes(q)) {
        state.searchHistory = [q, ...state.searchHistory.slice(0, 7)];
      }
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    },
    setFeedSourceFilter(state, action: PayloadAction<ContentSource | "all">) {
      state.selectedSourceFilter = action.payload;
    },
    setFeedSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    reorderFeed(state, action: PayloadAction<{ fromId: string; toId: string }>) {
      const { fromId, toId } = action.payload;
      const oldIndex = state.feed.findIndex((i) => i.id === fromId);
      const newIndex = state.feed.findIndex((i) => i.id === toId);
      if (oldIndex >= 0 && newIndex >= 0) {
        const [moved] = state.feed.splice(oldIndex, 1);
        state.feed.splice(newIndex, 0, moved);
      }
    },
    resetFeedOrder(state) {
      state.feed = [...state.originalFeed];
    },
    receiveLiveItem(state, action: PayloadAction<ContentItem>) {
      const item = action.payload;
      if (!state.pendingLiveItems.some((i) => i.id === item.id) && !state.feed.some((i) => i.id === item.id)) {
        state.pendingLiveItems.unshift(item);
      }
    },
    applyPendingLiveItems(state) {
      if (state.pendingLiveItems.length > 0) {
        state.feed = [...state.pendingLiveItems, ...state.feed];
        state.originalFeed = [...state.pendingLiveItems, ...state.originalFeed];
        state.pendingLiveItems = [];
      }
    },
    clearPendingLiveItems(state) {
      state.pendingLiveItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // loadFeedPage
      .addCase(loadFeedPage.pending, (state) => {
        state.feedStatus = "loading";
        state.feedError = null;
      })
      .addCase(loadFeedPage.fulfilled, (state, action) => {
        state.feedStatus = "succeeded";
        const { items, page, isReset } = action.payload;

        if (isReset || page === 0) {
          state.feed = items;
          state.originalFeed = items;
          state.feedPage = 1;
        } else {
          // Filter duplicates before appending
          const existingIds = new Set(state.feed.map((i) => i.id));
          const fresh = items.filter((i) => !existingIds.has(i.id));
          state.feed.push(...fresh);
          state.originalFeed.push(...fresh);
          state.feedPage = page + 1;
        }
        state.hasMore = items.length === PAGE_SIZE && state.feedPage < 6;
      })
      .addCase(loadFeedPage.rejected, (state, action) => {
        state.feedStatus = "failed";
        state.feedError = action.error.message ?? "Could not load feed";
      })
      // loadTrending
      .addCase(loadTrending.pending, (state) => {
        state.trendingStatus = "loading";
      })
      .addCase(loadTrending.fulfilled, (state, action) => {
        state.trendingStatus = "succeeded";
        state.trending = action.payload;
      })
      .addCase(loadTrending.rejected, (state) => {
        state.trendingStatus = "failed";
      })
      // executeSearch
      .addCase(executeSearch.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(executeSearch.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(executeSearch.rejected, (state) => {
        state.searchStatus = "failed";
      });
  },
});

export const {
  setSearchQuery,
  addSearchHistory,
  clearSearchHistory,
  setFeedSourceFilter,
  setFeedSortBy,
  reorderFeed,
  resetFeedOrder,
  receiveLiveItem,
  applyPendingLiveItems,
  clearPendingLiveItems,
} = contentSlice.actions;

export default contentSlice.reducer;
