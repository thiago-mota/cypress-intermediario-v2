import { faker } from '@faker-js/faker';

describe('Testa git clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
  };
  
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.api_createProject(project);
  })
  it('successfully', () => {
    cy.cli_cloneViaSSH(project);

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`);
  });
});