import { faker } from '@faker-js/faker';
const options = { env: { snapshotOnly: true } };

describe('Create Project', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.api_deleteProjects();
    cy.login();
  })

  it('cria um novo projeto por meio da interface gráfica', options, () => {  
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

