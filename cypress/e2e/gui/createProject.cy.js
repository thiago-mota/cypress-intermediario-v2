import { faker } from '@faker-js/faker';

describe('Creates Projects', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.api_deleteProjects();
    cy.login();
  })

  it('successfully creates new projects from GUI', () => {  
    const project = {
      name: `project-${faker.datatype.uuid()}`,
    }

    cy.gui_createProject(project);

    cy.url()
      .should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`);
    cy.contains(project.name)
      .should('be.visible');
  })
})

