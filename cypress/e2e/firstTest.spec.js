/// <reference types="cypress" />

describe('First test suite', () => {
    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //by tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by class
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[fullwidth]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        //by entire class name
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, class, id and attribute
        cy.get('input.input-full-width#inputEmail1[fullwidth]')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })
})