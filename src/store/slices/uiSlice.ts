import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ContentItem } from "@/types";

export type DashboardSection = "feed" | "trending" | "favorites" | "analytics" | "settings";

export interface UiState {
  activeSection: DashboardSection;
  mobileMenuOpen: boolean;
  profileModalOpen: boolean;
  notificationsDrawerOpen: boolean;
  activeReaderItem: ContentItem | null;
}

const initialState: UiState = {
  activeSection: "feed",
  mobileMenuOpen: false,
  profileModalOpen: false,
  notificationsDrawerOpen: false,
  activeReaderItem: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<DashboardSection>) {
      state.activeSection = action.payload;
      state.mobileMenuOpen = false;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setProfileModalOpen(state, action: PayloadAction<boolean>) {
      state.profileModalOpen = action.payload;
    },
    setNotificationsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.notificationsDrawerOpen = action.payload;
    },
    openReaderModal(state, action: PayloadAction<ContentItem>) {
      state.activeReaderItem = action.payload;
    },
    closeReaderModal(state) {
      state.activeReaderItem = null;
    },
  },
});

export const {
  setActiveSection,
  setMobileMenuOpen,
  toggleMobileMenu,
  setProfileModalOpen,
  setNotificationsDrawerOpen,
  openReaderModal,
  closeReaderModal,
} = uiSlice.actions;

export default uiSlice.reducer;
