import { faker } from '@faker-js/faker';

describe('Creates projects', () => {
  const project = {
    name: `project${ faker.datatype.uuid() }`
  };

  beforeEach(() => {
    cy.api_deleteProjects();
  })

  it('successfully creates project from API ', () => {
    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal(project.name);
      });
  });
});
