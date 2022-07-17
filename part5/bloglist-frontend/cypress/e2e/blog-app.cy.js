describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "James Ingerson",
      username: "jamesi",
      password: "securepassword",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("jamesi");
      cy.get("#password").type("securepassword");
      cy.get("#login-button").click();
      cy.contains("James Ingerson logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("jamesi");
      cy.get("#password").type("incorrect");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Invalid credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.get("html").should("not.contain", "James Ingerson logged in");
    });
  });
});
