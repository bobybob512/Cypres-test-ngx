import { formLayoutsPage, onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import {  navigateTo } from "../support/page_objects/navigationPage"

describe('Test with page objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow`s date in calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail()
    })
})