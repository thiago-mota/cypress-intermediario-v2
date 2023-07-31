import { faker } from '@faker-js/faker';

describe('Creates issues', () => {
  const issue = {
    title: `issue-${ faker.datatype.uuid() }`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
    }
  };

  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.api_deleteProjects();
    cy.login();
    cy.api_createProject(issue.project);
  });

  it('successfully creates and adds issues from GUI', () => {
    cy.gui_createIssue(issue);
    cy.get('[data-testid="issue-title"]')
      .should('contain', issue.title);
  });
});