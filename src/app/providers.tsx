"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  // Avoid a hydration mismatch: redux-persist rehydrates on the client only.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {mounted ? children : null}
      </PersistGate>
    </Provider>
  );
}
