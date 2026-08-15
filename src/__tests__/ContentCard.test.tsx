import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContentCard } from "@/components/content/ContentCard";
import type { ContentItem } from "@/types";
import { renderWithStore } from "@/__tests__/test-utils";

const mockItem: ContentItem = {
  id: "technology-news-0",
  source: "news",
  category: "technology",
  title: "Test headline about a new chip",
  description: "Short description of the story.",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  ctaLabel: "Read Story",
  url: "#",
  author: "Test Author",
  publishedAt: new Date().toISOString(),
  readTimeMinutes: 4,
  trendingScore: 50,
  tags: ["AI", "Tech"],
};

describe("ContentCard", () => {
  it("renders the title and call-to-action", () => {
    renderWithStore(<ContentCard item={mockItem} />);
    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Read Story" })).toBeInTheDocument();
  });

  it("toggles the favorite state when the heart button is clicked", async () => {
    const user = userEvent.setup();
    renderWithStore(<ContentCard item={mockItem} />);

    const favoriteButton = screen.getByRole("button", { name: /save to favorites/i });
    expect(favoriteButton).toHaveAttribute("aria-pressed", "false");

    await user.click(favoriteButton);

    expect(screen.getByRole("button", { name: /remove favorite/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });
});
