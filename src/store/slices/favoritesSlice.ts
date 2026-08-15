import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ContentCategory, ContentItem, ContentSource } from "@/types";

export interface FavoritesState {
  items: ContentItem[];
  selectedCategoryFilter: ContentCategory | "all";
  selectedSourceFilter: ContentSource | "all";
  searchQuery: string;
}

const initialState: FavoritesState = {
  items: [],
  selectedCategoryFilter: "all",
  selectedSourceFilter: "all",
  searchQuery: "",
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<ContentItem>) {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite(state, action: PayloadAction<ContentItem>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.unshift(action.payload);
      }
    },
    clearAllFavorites(state) {
      state.items = [];
    },
    setFavoritesCategoryFilter(state, action: PayloadAction<ContentCategory | "all">) {
      state.selectedCategoryFilter = action.payload;
    },
    setFavoritesSourceFilter(state, action: PayloadAction<ContentSource | "all">) {
      state.selectedSourceFilter = action.payload;
    },
    setFavoritesSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearAllFavorites,
  setFavoritesCategoryFilter,
  setFavoritesSourceFilter,
  setFavoritesSearchQuery,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
