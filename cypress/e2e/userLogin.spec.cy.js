describe('admin login page', () => {
	let invalidEmail = "user@gmail.com"
	let invalidPassword = "invalidpass"
  	// navigate to /login 
	beforeEach(() => {
		cy.visit('/')
        cy.contains('LOGIN').click()
	  })

	context('given login form', () => {
		it('has form elements', () => {
            // check for elements within form
            cy.get('.login__form.elevation-2').within(($loginwindow) => {
                // check heading  
			    cy.contains('.text-h5', 'Log In').should('be.visible')
                // check email field
                cy.get('input[class="v-field__input"]').first().should('not.be.visible')
                // check password field
                cy.get('input[class="v-field__input"]').last().should('not.be.visible')
                // check submit button
                cy.get('.v-btn').should('be.visible')
                // check forgot password link
                cy.get('.auth-actions > :nth-child(1)').contains('Forgot password?')
                .should('be.visible')
                // check signup link
                cy.get('.auth-actions > :nth-child(2)').contains("Don't have an account? Sign up")
                .should('be.visible')

            })
		})
	})

	context('given blank user credentials', () => {
		it('shows login error', () => {
			// blank email and blank password
            cy.get('.login__form.elevation-2').within(($loginwindow) => {
                cy.get('.v-btn').click()
                cy.get('.login__error-message').should('be.visible')
            })
		})
	  })


	context('given INVALID user credentials', () => {
		it('invalid email shows login error', () => {
			// login using the loginUser command
			// invalid email
			cy.loginUser(invalidEmail, Cypress.env('user_password'))
            // check within the form
            cy.get('.login__form.elevation-2').within(($loginwindow) => {
                cy.get('.login__error-message').should('be.visible')
            })
		})
		it('invalid password shows login error', () => {
			// login using the loginUser command
			// invalid password
            // pass the email from the userEmail command
            cy.userEmail().then(email => {
                // login using the loginUser command
                cy.loginUser(email, invalidPassword)
            })
			// check within the form
            cy.get('.login__form.elevation-2').within(($loginwindow) => {
                cy.get('.login__error-message').should('be.visible')
            })
		})
		it('invalid email and invalid password shows login error', () => {
			// login using the loginAdmin command
			// invalid email and invalid password
			cy.loginUser(invalidEmail, invalidPassword)
			// check within the form
            cy.get('.login__form.elevation-2').within(($loginwindow) => {
                cy.get('.login__error-message').should('be.visible')
            })
		})
	  })

	context('given valid user credentials', () => {
		it('user is logged in', () => {
            // pass the email from the userEmail command
            cy.userEmail().then(email => {
                // login using the loginUser command
                cy.loginUser(email, Cypress.env('user_password'))
                // confirm the logout button
			    cy.get('.ml-6 > .v-btn__content').contains('LOGOUT')
                .should('be.visible')
                cy.get('.v-toolbar__content > .v-container > :nth-child(3)').within(($toolbar) =>{
                    cy.get('.v-img__img').click()
                })
                cy.get('.settings__user-details > :nth-child(5) > :nth-child(2)').contains(email)
                .should('be.visible')
            })
            
		})
	  })

})