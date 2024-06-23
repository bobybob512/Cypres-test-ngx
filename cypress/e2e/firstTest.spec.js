/// <reference types="cypress" />

const exp = require("constants")

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

    it('second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //3 main methods
        //get() - find elements on the page by locator globally
        //find() - find child elements by locator
        //contains() - find HTML text and be text and locator

        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card','Horizontal form').find('button')
        cy.contains('nb-card','Horizontal form').contains('Sign in')

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //CANT DO THINGS LIKE THIS
        //cons usingTheGrid = cy.contains('nb-card','Using the Grid')
        //usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        //usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // 1 Cypress Alias
        cy.contains('nb-card','Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        //2 Cypress then() methods
        cy.contains('nb-card','Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        //cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')

        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address')
        // or
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')
        })

        // 4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        // 5 invoke property
        cy.get('[id="exampleInputEmail1"]').type('test@test.com')
        cy.get('[id="exampleInputEmail1"]').invoke('prop', 'value').should('contain', 'test@test.com').then(property => {
            expect(property).to.equal('test@test.com')
        })
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //cy.get('[type="checkbox"]').check({force: true})
        //cy.get('[type="checkbox"]').uncheck({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})
    })

    it.only('datepicker', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('.day-cell').not('.bounding-month').contains('28').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 28, 2024')
            // or
            cy.wrap(input).should('have.value', 'Jun 28, 2024')

            // Using javascript date object
            let date = new Date()
            date.setDate(date.getDate() + 4)
            console.log(date)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

            cy.wrap(input).click()

            function selectDayFromCurrent(){
                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                    if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDayFromCurrent()
                    } else {
                        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                    }
                })
            }
            
            selectDayFromCurrent()
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            // or
            cy.wrap(input).should('have.value', dateToAssert)

        })
    })
})