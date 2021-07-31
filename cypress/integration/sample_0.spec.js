/// <reference types="cypress" />

describe('My First Test 0', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
  })

describe('My First Test 1', () => {
    it('Visits the Kitchen Sink', () => {
      cy.visit('https://example.cypress.io')
    })
  })

describe('My First Test 2', () => {
    it('finds the content "type"', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type')
    })
  })
  
describe('My First Test 3', () => {
    it('finds the content "hype"', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('hype')
    })
  })
  
describe('My First Test 4', () => {
    it('clicks the link "type"', () => {
      cy.visit('https://example.cypress.io')
  
      cy.contains('type').click()
    })
  })

describe('My First Test 5', () => {
    it('clicks the button', () => {
      cy.visit('localhost:4200/about')
  
      cy.get('.button').click()
      cy.focused().click()
      cy.contains('Close').click() 
    })
  })

describe('My First Test 6', () => {
    it('See if "The RxJs In Practice Course"', () => {
      cy.visit('localhost:4200/about')
  
      cy.get('.about')
      cy.contains('The RxJs In Practice Course')  
    })
  })
