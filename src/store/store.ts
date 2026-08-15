import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/store/slices/authSlice";
import contentReducer from "@/store/slices/contentSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import realtimeReducer from "@/store/slices/realtimeSlice";
import uiReducer from "@/store/slices/uiSlice";

const persistConfig = {
  key: "signal-dashboard-v2",
  storage,
  whitelist: ["preferences", "favorites", "auth"],
};

const rootReducer = combineReducers({
  preferences: preferencesReducer,
  content: contentReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  realtime: realtimeReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    preloadedState: preloadedState as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
