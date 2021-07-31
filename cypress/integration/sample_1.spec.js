/// <reference types="cypress" />

describe('My First Test 0', () => {
    it('See if courses-panel exists', () => {
      cy.visit('localhost:4200')
  
      cy.get('.courses-panel')

      cy.get('h3')
        .should('contain', 'All Courses') 
    })
  })

    /*
    <mat-tab-group>
        <mat-tab label="Beginners">
            <courses-card-list
                    [courses]="beginnerCourses$ | async">
            </courses-card-list>
        </mat-tab>

        <mat-tab label="Advanced">
            <courses-card-list
                    [courses]="advancedCourses$ | async"
            ></courses-card-list>
        </mat-tab>
    </mat-tab-group>
    */

describe('My First Test 1', () => {
    it('See if Beginners exists', () => {
      cy.get('mat-tab-group')
        .should('contain', 'Beginners')
    })

    it('See if Advanced exists', () => {
      cy.get('mat-tab-group')
        .should('contain', 'Advanced')
    })
    /*
    it('See if the button - Advanced is click-able', () => {
      cy.get('mat-tab-group')
      .should('contain', 'Advanced').click()
    })*/
  })

describe('My First Test 2', () => {
    it('See if the button - Beginners is click-able', () => {
      cy.get('mat-tab-group')
      .should('contain', 'Beginners').click() 
    })
  })

describe('My First Test 3', () => {
    it('See if description exists', () => {
      cy.get('mat-card-title')
      cy.contains('RxJs In Practice Course')
    })
  })

describe('My First Test 4', () => {
    it('See if iconUrl exists', () => {
      cy.get('img')
        .should('have.attr', 'src')
        .should('include','https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png')
    })
})

describe('My First Test 5', () => {
    it('See if longDescription exists', () => {
      cy.get('p')
      cy.contains('Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples')
    })
  })

describe('My First Test 6', () => {
    it('See if VIEW COURSE exists', () => {
      cy.get('mat-card-actions')
        .should('contain', 'VIEW COURSE')
    })

    it('See if EDIT exists', () => {
      cy.get('mat-tab-group')
        .should('contain', 'EDIT')
    })
  })
