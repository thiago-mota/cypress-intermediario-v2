describe('Login', () => {
  it('successfully login into app', () => {
    cy.viewport(1920, 1080)
    const user = Cypress.env('user_name');
    const password = Cypress.env('user_password');
    const options = { cacheSession: false };

    cy.login(user, password, options);
    cy.url().should('be.equal', 'http://localhost/')
  });
})