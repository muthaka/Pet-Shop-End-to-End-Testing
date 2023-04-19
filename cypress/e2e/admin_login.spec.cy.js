describe('admin login page', () => {
  // navigate to /login 
	beforeEach(() => {
		cy.visit('/login')
	  })

	it('login page has form elements', () => {
    // check log in heading  
		cy.contains('.text-h5', 'Log In')
    // check email field 
		cy.get('#input-0').should('not.be.visible')
    // check password field
		cy.get('#input-2').should('not.be.visible')
    // check submit button
    cy.get('.v-btn').should('be.visible')
	})
	
	it('admin should login successfully', () => {
    // login using the loginAdmin command
		cy.loginAdmin(Cypress.env('admin_email'), Cypress.env('admin_password'))
    // confirm url is redirected to /dashboard 
		cy.url().should('include', '/dashboard')
    // confirm the page heading
    cy.get('.text-h5').contains('Dashboard')
	})

})