import authReducer, {
  login,
  logout,
  updateProfile,
  recordArticleRead,
} from "@/store/slices/authSlice";

describe("authSlice", () => {
  const initial = {
    isAuthenticated: true,
    user: {
      id: "usr_1028",
      name: "Jordan Diaz",
      email: "jordan.diaz@example.com",
      username: "jordandiaz",
      avatar: "https://example.com/avatar.jpg",
      bio: "Engineer",
      joinedDate: "2024-03-15",
      readArticlesCount: 10,
      interests: ["technology"] as any[],
    },
    readHistory: ["item-1"],
  };

  it("handles user logout and login", () => {
    let state = authReducer(initial, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user.name).toBe("Guest User");

    state = authReducer(state, login({ name: "Alex Mercer", email: "alex@example.com" }));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.name).toBe("Alex Mercer");
  });

  it("updates user profile fields", () => {
    const state = authReducer(
      initial,
      updateProfile({ bio: "Updated Bio", name: "Jordan D." })
    );
    expect(state.user.bio).toBe("Updated Bio");
    expect(state.user.name).toBe("Jordan D.");
  });

  it("records reading history and increments article read count without duplicates", () => {
    let state = authReducer(initial, recordArticleRead("item-2"));
    expect(state.user.readArticlesCount).toBe(11);
    expect(state.readHistory).toContain("item-2");

    // Reading same item again shouldn't duplicate
    state = authReducer(state, recordArticleRead("item-2"));
    expect(state.user.readArticlesCount).toBe(11);
  });
});
