function selectGroupMenuItem(){
    cy.contains('a', 'Forms').then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr=> {
            if(attr.includes('left')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class NavigationPage{
    
    formLayoutsPage(){
        //cy.contains('Forms').click()

        selectGroupMenuItem()
        cy.contains('Form Layouts').click()
    }

    datepickerPage(){
        //cy.contains('Forms').click()
        selectGroupMenuItem()
        cy.contains('Datepicker').click()
    }
}

export const navigateTo = new NavigationPage()