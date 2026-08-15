import preferencesReducer, {
  setCategories,
  toggleCategory,
  toggleDarkMode,
} from "@/store/slices/preferencesSlice";

describe("preferencesSlice", () => {
  const initialState = {
    categories: ["technology", "sports", "finance"] as const,
    darkMode: false,
  };

  it("removes a category that is already selected", () => {
    const state = preferencesReducer(
      { ...initialState, categories: [...initialState.categories] },
      toggleCategory("sports")
    );
    expect(state.categories).toEqual(["technology", "finance"]);
  });

  it("adds a category that is not yet selected", () => {
    const state = preferencesReducer(
      { ...initialState, categories: [...initialState.categories] },
      toggleCategory("science")
    );
    expect(state.categories).toContain("science");
  });

  it("allows clearing every category (empty-state edge case)", () => {
    const state = preferencesReducer(
      { ...initialState, categories: [...initialState.categories] },
      setCategories([])
    );
    expect(state.categories).toHaveLength(0);
  });

  it("toggles dark mode", () => {
    const state = preferencesReducer(
      { ...initialState, categories: [...initialState.categories] },
      toggleDarkMode()
    );
    expect(state.darkMode).toBe(true);
  });
});
