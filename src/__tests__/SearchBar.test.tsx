import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchBar } from "@/components/search/SearchBar";
import { renderWithStore } from "@/__tests__/test-utils";

describe("SearchBar", () => {
  it("dispatches a debounced search after the user stops typing", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    const { store } = renderWithStore(<SearchBar />);

    const input = screen.getByRole("searchbox", { name: /search news/i });
    await user.type(input, "chip");

    // Not yet dispatched: debounce window hasn't elapsed.
    expect(store.getState().content.searchStatus).toBe("idle");

    jest.advanceTimersByTime(400);
    // Allow the thunk's microtask/mock-delay chain to flush.
    await jest.runOnlyPendingTimersAsync();

    expect(store.getState().content.searchQuery).toBe("chip");
    jest.useRealTimers();
  });

  it("clears search results when the input is emptied", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<SearchBar />);

    const input = screen.getByRole("searchbox", { name: /search news/i });
    await user.type(input, "a");
    await user.clear(input);

    expect(store.getState().content.searchQuery).toBe("");
  });
});
