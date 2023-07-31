import { faker } from '@faker-js/faker';

describe('adiciona uma milestone a uma issue', () => {
  const issue = {
    title: `issue-${ faker.datatype.uuid() }`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
    },
  };

  const milestone = {
    title: `milestone-${faker.random.word(2)}`,
  }

  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
    cy.api_createIssue(issue)
      .then((response) => {
        cy.api_createMilestone(response.body.project_id, milestone);
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`);
      });
  });
  
  it('successfully adds a milestone', () => {
    cy.gui_setMilestoneOnIssue(milestone);
    cy.get('[data-testid="sidebar-milestones"]').should('contain', milestone.title)
  });
});