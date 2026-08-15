import type { PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import authReducer from "@/store/slices/authSlice";
import contentReducer from "@/store/slices/contentSlice";
import favoritesReducer from "@/store/slices/favoritesSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";
import realtimeReducer from "@/store/slices/realtimeSlice";
import uiReducer from "@/store/slices/uiSlice";

export function createTestStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      preferences: preferencesReducer,
      content: contentReducer,
      favorites: favoritesReducer,
      auth: authReducer,
      realtime: realtimeReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
}

export function renderWithStore(
  ui: React.ReactElement,
  options?: RenderOptions & { preloadedState?: any }
) {
  const store = createTestStore(options?.preloadedState);

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
