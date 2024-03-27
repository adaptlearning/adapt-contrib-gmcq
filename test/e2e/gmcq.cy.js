describe('Graphic Multiple Choice Question', function () {
  beforeEach(function () {
    cy.getData()
    cy.visit('/');
  });

  it('should display the gmcq component', function () {
    const gmcqComponents = this.data.components.filter((component) => component._component === 'gmcq')
    gmcqComponents.forEach((gmcqComponent) => {
      cy.visit(`/#/preview/${gmcqComponent._id}`);
      const bodyWithoutHtml = cy.helpers.stripHtml(gmcqComponent.body)
      cy.testContainsOrNotExists('.gmcq__body', bodyWithoutHtml)
      
      cy.testContainsOrNotExists('.gmcq__title', gmcqComponent.displayTitle)
      cy.testContainsOrNotExists('.gmcq__instruction', gmcqComponent.instruction)
      cy.get('.gmcq-item').should('have.length', gmcqComponent._items.length)
      gmcqComponent._items.forEach((item) => {
        cy.testContainsOrNotExists('.gmcq-item__text', item.text)
      })

      // Make sure the current component is tested before moving to the next one
      // Custom cypress tests are async so we need to wait for them to pass first
      cy.wait(1000)
    });
  });
});