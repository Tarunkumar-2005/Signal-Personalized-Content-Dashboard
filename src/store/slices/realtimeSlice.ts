import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { ContentItem, RealtimeNotification } from "@/types";

export interface RealtimeState {
  notifications: RealtimeNotification[];
  isStreamActive: boolean;
  toastMessage: string | null;
}

const initialNotifications: RealtimeNotification[] = [
  {
    id: "notif-1",
    type: "breaking_news",
    title: "Breaking Tech News",
    message: "W3C finalizes high-performance local offline storage specification.",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    read: false,
  },
  {
    id: "notif-2",
    type: "trending_alert",
    title: "Trending Story Alert",
    message: "James Webb Telescope exoplanet discovery is surging across all channels.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
  },
];

const initialState: RealtimeState = {
  notifications: initialNotifications,
  isStreamActive: true,
  toastMessage: null,
};

const realtimeSlice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    addNotification(
      state,
      action: PayloadAction<{
        type: RealtimeNotification["type"];
        title: string;
        message: string;
        item?: ContentItem;
      }>
    ) {
      const newNotif: RealtimeNotification = {
        id: `notif-${Date.now()}`,
        type: action.payload.type,
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date().toISOString(),
        read: false,
        item: action.payload.item,
      };
      state.notifications.unshift(newNotif);
      if (state.notifications.length > 20) {
        state.notifications.pop();
      }
    },
    markAllNotificationsRead(state) {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },
    markNotificationRead(state, action: PayloadAction<string>) {
      const n = state.notifications.find((notif) => notif.id === action.payload);
      if (n) n.read = true;
    },
    toggleStreamActive(state) {
      state.isStreamActive = !state.isStreamActive;
    },
    setToastMessage(state, action: PayloadAction<string | null>) {
      state.toastMessage = action.payload;
    },
    clearToast(state) {
      state.toastMessage = null;
    },
  },
});

export const {
  addNotification,
  markAllNotificationsRead,
  markNotificationRead,
  toggleStreamActive,
  setToastMessage,
  clearToast,
} = realtimeSlice.actions;

export default realtimeSlice.reducer;
