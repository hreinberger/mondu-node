/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe";

describe("Mondu Widget", () => {
  it("should create a successful Mondu Invoice Order with the legacy widget", () => {
    cy.visit("/checkout");
    cy.get("#country").select("Germany");
    cy.get("#same-address").check();
    cy.get("#flexRadioDefault1").check();
    cy.get("#confirm-button").click();
    cy.get("#mondu-checkout-widget").should("not.be.empty");
    cy.frameLoaded("[title=mondu_checkout_widget]");

    cy.enter("[title=mondu_checkout_widget]").then((getBody) => {
      cy.wait(5000); // widget takes a while to load
      getBody()
        .find("button[data-test-id='next_button']")
        .scrollIntoView()
        .should("be.visible")
        .click();
    });
    cy.get("h1").should("exist").contains("Success");

    cy.on("uncaught:exception", (e) => {
      if (e.message.includes("Error: Script error.")) {
        // we expected this error, so let's ignore it
        // and let the test continue
        return false;
      }
      // on any other error message the test fails
    });

    /* ==== Generated with Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  });
});
