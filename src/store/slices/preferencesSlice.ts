import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type {
  ContentCategory,
  ContentSource,
  PaginationMode,
  SupportedLanguage,
  UserPreferences,
  ViewMode,
} from "@/types";

const initialState: UserPreferences = {
  categories: ["technology", "sports", "finance", "entertainment", "science"],
  sources: ["news", "recommendation", "social"],
  darkMode: false,
  viewMode: "grid",
  paginationMode: "infinite",
  autoRefresh: true,
  autoRefreshIntervalSeconds: 30,
  language: "en",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<ContentCategory>) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setCategories(state, action: PayloadAction<ContentCategory[]>) {
      state.categories = action.payload;
    },
    toggleSource(state, action: PayloadAction<ContentSource>) {
      const source = action.payload;
      if (state.sources.includes(source)) {
        // Keep at least one source
        if (state.sources.length > 1) {
          state.sources = state.sources.filter((s) => s !== source);
        }
      } else {
        state.sources.push(source);
      }
    },
    setSources(state, action: PayloadAction<ContentSource[]>) {
      state.sources = action.payload;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    setPaginationMode(state, action: PayloadAction<PaginationMode>) {
      state.paginationMode = action.payload;
    },
    setAutoRefresh(state, action: PayloadAction<boolean>) {
      state.autoRefresh = action.payload;
    },
    setLanguage(state, action: PayloadAction<SupportedLanguage>) {
      state.language = action.payload;
    },
    resetPreferences(state) {
      state.categories = ["technology", "sports", "finance", "entertainment", "science"];
      state.sources = ["news", "recommendation", "social"];
      state.viewMode = "grid";
      state.paginationMode = "infinite";
      state.autoRefresh = true;
      state.language = "en";
    },
  },
});

export const {
  toggleCategory,
  setCategories,
  toggleSource,
  setSources,
  setDarkMode,
  toggleDarkMode,
  setViewMode,
  setPaginationMode,
  setAutoRefresh,
  setLanguage,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
