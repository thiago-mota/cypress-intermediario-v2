import { faker } from '@faker-js/faker';

describe('Set label on issue', () => {
  const label = {
    name: `label ${faker.random.word(2)}`,
    color: '#ffaabb',
  };

  const issue = {
    title: `issue-${ faker.datatype.uuid() }`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
    },
  };

  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
    cy.api_createIssue(issue)
      .then((response) => {
        cy.api_createLabel(response.body.project_id, label);
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);
      });
  });

  it('adiciona uma label a issue', () => {
    cy.gui_setLabelOnInssue(label);
    cy.get(`[data-qa-label-name="${label.name}"]`)
      .should('be.visible')
      .and('contain', label.name);
  });
});