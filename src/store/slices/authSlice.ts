import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ContentCategory, UserProfile } from "@/types";

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
  readHistory: string[]; // item ids read
}

const initialUser: UserProfile = {
  id: "usr_1028",
  name: "Jordan Diaz",
  email: "jordan.diaz@example.com",
  username: "jordandiaz",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  bio: "Frontend Engineer & Design Systems enthusiast. Tracking AI, open web standards, and space exploration.",
  joinedDate: "2024-03-15",
  readArticlesCount: 42,
  interests: ["technology", "science", "finance"],
};

const initialState: AuthState = {
  isAuthenticated: true,
  user: initialUser,
  readHistory: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isAuthenticated = true;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.username = action.payload.name.toLowerCase().replace(/\s+/g, "");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user.name = "Guest User";
      state.user.email = "guest@example.com";
      state.user.username = "guest";
    },
    updateProfile(
      state,
      action: PayloadAction<Partial<Omit<UserProfile, "id" | "joinedDate">>>
    ) {
      state.user = { ...state.user, ...action.payload };
    },
    recordArticleRead(state, action: PayloadAction<string>) {
      if (!state.readHistory.includes(action.payload)) {
        state.readHistory.push(action.payload);
        state.user.readArticlesCount += 1;
      }
    },
    updateUserInterests(state, action: PayloadAction<ContentCategory[]>) {
      state.user.interests = action.payload;
    },
  },
});

export const { login, logout, updateProfile, recordArticleRead, updateUserInterests } =
  authSlice.actions;

export default authSlice.reducer;
