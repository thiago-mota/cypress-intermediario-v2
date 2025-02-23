describe('Logout', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.login()
  })
  it('successfully logout from app', () => {
    cy.visit('localhost')
    cy.logout();
    cy.get('[data-qa-selector="sign_in_button"]')
    .should('be.visible');
    // outra maneira de verificar se houve logout é por meio da url.
    cy.url()
      .should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
      // também é possível utilizar a url direta: 
      cy.url()
        .should('be.equal', 'http://localhost/users/sign_in')
  });
})
