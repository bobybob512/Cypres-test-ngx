function selectDayFromCurrent(day){

    // Using javascript date object
    let date = new Date()
    date.setDate(date.getDate() + day)
    console.log(date)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })
    return dateToAssert
}

export class datepickerPage{

    selectCommonDatePickerDateFromToday(dayFromToday){

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateToAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            // or
            cy.wrap(input).should('have.value', dateToAssert)
        })         
    }

    selectDatePickerRangeFromToday(firstDay, secondDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateToAssertFirst = selectDayFromCurrent(firstDay)
            let dateToAssertSecond = selectDayFromCurrent(secondDay)
            const finalDate = dateToAssertFirst + ' - ' + dateToAssertSecond

            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            // or
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const onDatepickerPage = new datepickerPage()