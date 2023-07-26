import { faker } from '@faker-js/faker';

describe('Create issue', () => {
  const issue = {
    title: `issue-${ faker.datatype.uuid() }`,
    description: faker.random.words(5),
    project: {
      name: `project-${faker.datatype.uuid()}`,
    },
  };

  beforeEach(() => {
    cy.api_deleteProjects()
  });

  it('cria uma issue via API', () => {
    cy.api_createIssue(issue)
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal(issue.title);
        expect(response.body.description).to.equal(issue.description);
      });
  });
});