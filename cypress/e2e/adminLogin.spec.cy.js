describe('admin login page', () => {
	let invalidEmail = "admin@gmail.com"
	let invalidPassword = "invalidpass"
  	// navigate to /login 
	beforeEach(() => {
		cy.visit('/login')
	  })

	context('given login page', () => {
		it('has form elements', () => {
			// check heading  
			cy.contains('.text-h5', 'Log In')
			// check email field 
			cy.get('#input-0').should('not.be.visible')
			// check password field
			cy.get('#input-2').should('not.be.visible')
			// check submit button
			cy.get('.v-btn').should('be.visible')
		})
	})

	context('given blank user credentials', () => {
		it('shows login error', () => {
			// blank email and blank password
			cy.get('.v-btn').click()
			cy.get('.login__error-message').should('be.visible')
		})
	  })


	context('given INVALID user credentials', () => {
		it('invalid email shows login error', () => {
			// login using the loginAdmin command
			// invalid email
			cy.loginAdmin(invalidEmail, Cypress.env('admin_password'))
			cy.get('.login__error-message').should('be.visible')
		})
		it('invalid password shows login error', () => {
			// login using the loginAdmin command
			// invalid password
			cy.loginAdmin(Cypress.env('admin_email'), invalidPassword)
			cy.get('.login__error-message').should('be.visible')
		})
		it('invalid email and invalid password shows login error', () => {
			// login using the loginAdmin command
			// invalid email and invalid password
			cy.loginAdmin(invalidEmail, invalidPassword)
			cy.get('.login__error-message').should('be.visible')
		})
	  })

	context('given valid user credentials', () => {
		it('redirects to the dashboard page', () => {
			// login using the loginAdmin command
			cy.loginAdmin(Cypress.env('admin_email'), Cypress.env('admin_password'))
			// confirm url is redirected to /dashboard 
			cy.url().should('include', '/dashboard')
			// confirm the page heading
			cy.get('.text-h5').contains('Dashboard')
		})
	  })

})