/// <reference types="cypress" />

describe('Chuck Norris App', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
  it('More than 10 characters should disable search button', () => {
    
    cy.get('.searchBar').type('Feed the cat')
    cy.get('.searchBtn').should('be.disabled')
  })

})
