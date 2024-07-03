import { onDatepickerPage } from "../support/page_objects/datepickerPage"
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

    it('should submit Inline and Basic form and select tomorrow`s date in calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Bob', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
    })

    it.only('Chose a date from Datepicker', () => {
        navigateTo.datepickerPage()
        //onDatepickerPage.selectCommonDatePickerDateFromToday(1)
        onDatepickerPage.selectDatePickerRangeFromToday(0, 10)
    })
})