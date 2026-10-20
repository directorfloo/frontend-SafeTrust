describe("notification theme and read state", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.clearLocalStorage();
    cy.visit("/dashboard/notifications");
  });

  it("keeps notification text readable and the read state while switching themes", () => {
    let darkTitleColor = "";

    cy.get('[data-testid="notification-unread-count"]')
      .should("contain.text", "2 unread")
      .find('[aria-hidden="true"]')
      .should("have.text", "2");
    cy.get(".sr-only")
      .filter((_index, element) =>
        element.textContent?.includes("2 unread notifications"),
      )
      .filter(":visible")
      .should("have.length", 1);

    cy.contains("button", "Escrow funded").click();
    cy.get('[data-testid="notification-unread-count"]')
      .should("contain.text", "1 unread")
      .find('[aria-hidden="true"]')
      .should("have.text", "1");
    cy.get(".sr-only")
      .filter((_index, element) =>
        element.textContent?.includes("1 unread notifications"),
      )
      .filter(":visible")
      .should("have.length", 1);
    cy.contains("button", "Success: Escrow funded").should(
      "not.contain.text",
      "Unread.",
    );

    cy.get('button[aria-label="Switch to dark mode"]').click();
    cy.get("html").should("have.class", "dark");
    cy.contains("button", "Escrow funded")
      .find("p")
      .first()
      .should(($title) => {
        darkTitleColor = window.getComputedStyle($title[0]).color;
        expect(darkTitleColor).not.to.equal("rgb(255, 255, 255)");
      });

    cy.get('button[aria-label="Switch to light mode"]').click();
    cy.get("html").should("not.have.class", "dark");

    cy.contains("button", "Escrow funded")
      .find("p")
      .first()
      .should(($title) => {
        const lightTitleColor = window.getComputedStyle($title[0]).color;
        expect(lightTitleColor).not.to.equal("rgb(255, 255, 255)");
        expect(lightTitleColor).not.to.equal(darkTitleColor);
      });

    cy.get('button[aria-label="Switch to dark mode"]').click();
    cy.get("html").should("have.class", "dark");
    cy.get('[data-testid="notification-unread-count"]').should(
      "contain.text",
      "1 unread",
    );

    cy.contains("button", "Mark all as read").click();
    cy.contains("button", "Mark all as read").should("not.exist");
    cy.get('[data-testid="notification-unread-count"]').should("not.exist");
    cy.get(".sr-only")
      .filter((_index, element) =>
        element.textContent?.includes("1 unread notifications"),
      )
      .should("not.exist");
  });
});
