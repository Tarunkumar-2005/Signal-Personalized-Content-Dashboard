import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PreferencesPanel } from "@/components/settings/PreferencesPanel";
import { renderWithStore } from "@/__tests__/test-utils";

describe("PreferencesPanel", () => {
  it("renders category toggles and presets", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<PreferencesPanel />);

    expect(screen.getByText(/category selection/i)).toBeInTheDocument();
    const techButton = screen.getByRole("button", { name: /technology/i });
    expect(techButton).toBeInTheDocument();

    // Click select all
    const selectAllBtn = screen.getByRole("button", { name: /select all/i });
    await user.click(selectAllBtn);

    expect(store.getState().preferences.categories.length).toBeGreaterThanOrEqual(5);
  });

  it("changes display mode density", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<PreferencesPanel />);

    const compactBtn = screen.getByRole("button", { name: "compact" });
    await user.click(compactBtn);

    expect(store.getState().preferences.viewMode).toBe("compact");
  });
});
