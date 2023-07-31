Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.equal', '/users/sign_in')
  }
  
  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-qa-selector="user_menu"]').click();
  cy.contains('Sign out').click();
});

Cypress.Commands.add('gui_createProject', (project) => {
  cy.visit('projects/new#blank_project');

  cy.get('#project_name').type(project.name);
  cy.get('#blank-project-name [data-qa-selector="select_namespace_dropdown"]').click()
  cy.get('.gl-dropdown-inner').contains(Cypress.env('user_name')).click();
  cy.get('.custom-control-input').first().check();
  cy.contains('Create project').click();
})

Cypress.Commands.add('gui_createIssue', (issue) => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`);
  cy.get('#issue_title').type(issue.title);
  cy.get('#issue_description').type(issue.description);
  cy.get('.gl-button-text').contains('Create issue').click();
});

Cypress.Commands.add('gui_setLabelOnInssue', (label) => {
  cy.get('[data-qa-selector="labels_block"] .gl-button-text').click();
  cy.contains(label.name).click();
  cy.get('[data-testid="issue-title"]').click();
  cy.contains(label.name);
});

Cypress.Commands.add('gui_setMilestoneOnIssue', (milestone) => {
  cy.get('[data-qa-selector="milestone_block"] .gl-button-text').click();
  cy.contains(milestone.title).click();
});
