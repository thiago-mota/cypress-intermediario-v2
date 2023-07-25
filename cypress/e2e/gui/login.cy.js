describe('Testa as funcionalidades de login e logout', () => {
  it('é possível logar com sucesso', () => {
    cy.viewport(1920, 1080)
    const user = Cypress.env('user_name');
    const password = Cypress.env('user_password');
    const options = { cacheSession: false };

    cy.login(user, password, options);
    cy.url().should('be.equal', 'http://localhost/')
  });
})