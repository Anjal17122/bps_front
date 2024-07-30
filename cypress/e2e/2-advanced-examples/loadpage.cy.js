describe("Add Admin Form", () => {
  beforeEach(() => {
<<<<<<< HEAD
    cy.visit("https://www.naksapass.addon.com.np/superadmin/addadmin"); // Replace '/add-admin' with the actual URL of the form page
=======
    cy.visit("http://localhost:3200/superadmin/addadmin"); // Replace '/add-admin' with the actual URL of the form page
>>>>>>> ff43773054e172d515a3195c1ac3d0bfb5f0844b
  });

  it("should display the Add Admin form", () => {
    cy.get("h1").should("contain", "Add Admin");
  });
});
