
// --Command to login admin user to the petshop UI
Cypress.Commands.add('loginAdmin', (email, password) => {
    // clear all cookies
    cy.clearCookies()
    // find email input element and type the admin email
    cy.get('#input-0').clear().type(email)
    // find password input element and type the admin password
    cy.get('#input-2').clear().type(password)
    // find the submit button and click
    cy.get('.v-btn').click()
    
})