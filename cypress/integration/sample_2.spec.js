/// <reference types="cypress" />

describe('My First Test 0', () => {
    it('See if start.open exists', () => {
        cy.visit('localhost:4200')
    
        cy.get('mat-toolbar').click()

        cy.get('mat-toolbar', { timeout: 1000 })
        .find('button')
        .click()
      })

    it('See if fullscreen exists', () => {
        cy.get('mat-sidenav-container').click()
      })  

    it('See if library_books exists', () => {
        cy.get('mat-icon')
        cy.contains('library_books')
      })  

    it('See if Courses exists', () => {
        cy.get('span')
        cy.contains('Courses')
      })

    it('See if question_answer exists', () => {
        cy.get('mat-icon')
        cy.contains('question_answer')
      })  

    it('See if About exists', () => {
        cy.get('span')
        cy.contains('About')
      })

    it('See if person_add exists', () => {
        cy.get('mat-icon')
        cy.contains('person_add')
      })  

    it('See if Register exists', () => {
        cy.get('span')
        cy.contains('Register')
      })
      
    it('See if account_circle exists', () => {
        cy.get('mat-icon')
        cy.contains('account_circle')
      })  

    it('See if Login exists', () => {
        cy.get('span')
        cy.contains('Login')
      })  
  })
