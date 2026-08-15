describe("Signal Dashboard — Comprehensive E2E Test Suite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("1. Loads personalized feed and switches content source filters", () => {
    cy.contains(/personalized feed/i).should("be.visible");
    cy.get("article").should("have.length.greaterThan", 0);

    // Switch to News Wire filter
    cy.contains("button", /news wire|noticias/i).click();
    cy.get("article").should("have.length.greaterThan", 0);

    // Switch back to All Sources
    cy.contains("button", /all sources|todas las fuentes/i).click();
    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("2. Performs debounced cross-category search and clears query", () => {
    cy.get("input[type='search']").type("ai");
    cy.contains(/search results|resultados de búsqueda/i, { timeout: 6000 }).should("be.visible");
    cy.get("article").should("have.length.greaterThan", 0);

    // Clear search
    cy.contains("button", /clear|limpiar/i).click();
    cy.contains(/personalized feed/i).should("be.visible");
  });

  it("3. Saves content to Favorites and manages saved bookmarks", () => {
    // Click save favorite on first card
    cy.get("article").first().within(() => {
      cy.get("button[aria-label*='favorite' i]").click();
    });

    // Navigate to Favorites section
    cy.contains("button", /favorites|favoritos/i).click();
    cy.contains(/saved favorites|favoritos guardados/i).should("be.visible");
    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("4. Opens the rich content reader modal and closes it", () => {
    cy.get("article").first().find("h3").click();
    cy.get("div[role='dialog']", { timeout: 3000 }).should("exist");
    cy.contains("button", /close|cerrar/i).click();
  });

  it("5. Toggles dark mode seamlessly", () => {
    cy.get("button[aria-label*='dark' i, aria-label*='light' i, aria-label*='mode' i]").first().click();
    cy.get("html").should("have.class", "dark");
  });

  it("6. Switches interface language dynamically", () => {
    cy.get("button[aria-label='Select language']").click();
    cy.contains("button", "Español").click();
    cy.contains("Tu Feed Personalizado").should("be.visible");

    // Switch back to English
    cy.get("button[aria-label='Select language']").click();
    cy.contains("button", "English").click();
    cy.contains("Your Personalized Feed").should("be.visible");
  });

  it("7. Opens analytics and explores reading statistics", () => {
    cy.contains("button", /analytics|analítica/i).click();
    cy.contains(/consumption overview|resumen/i).should("be.visible");
  });

  it("8. Opens user profile modal and updates profile info", () => {
    cy.get("button[aria-label='Open profile settings']").click();
    cy.contains(/user profile|perfil/i).should("be.visible");
    cy.contains("button", /save changes|guardar/i).click();
  });
});
