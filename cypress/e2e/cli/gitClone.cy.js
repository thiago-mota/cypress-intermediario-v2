import { faker } from '@faker-js/faker';

describe('Clone project', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
  };
  
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.api_createProject(project);
  })
  it('successfully clones project from CLI', () => {
    cy.cli_cloneViaSSH(project);

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`);
  });
});