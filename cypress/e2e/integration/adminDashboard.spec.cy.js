describe('admin dashboard', () => {
      beforeEach(() => {
		cy.visit('/login')
        // login using the loginAdmin command
		cy.loginAdmin(Cypress.env('admin_email'), Cypress.env('admin_password'))
		// confirm url is redirected to /dashboard 
		cy.url().should('include', '/dashboard')

	  })

	context('given Dashboard page', () => {
        // test menu list is present
		it('has menu list', () => {
            cy.get('.v-navigation-drawer__content').within(($menu) => {
                cy.get(':nth-child(1) > :nth-child(1)').contains('Dashboard')
                .should('have.attr', 'href').and('equal', '/dashboard')
                cy.get(':nth-child(2) > :nth-child(1)').contains('Shipment Location')
                .should('have.attr', 'href').and('equal', '/dashboard/locations')
                cy.get(':nth-child(3) > :nth-child(1)').contains('Customers')
                .should('have.attr', 'href').and('equal', '/dashboard/customers')
                cy.get(':nth-child(4) > :nth-child(1)').contains('Products')
                .should('have.attr', 'href').and('equal', '/dashboard/products')
            })
		})
        // test page header is present
        it('has page header', () => {
            cy.get('.page-header').within(($header) => {
                cy.get('.text-h5').contains('Dashboard')
                cy.get('.breadcrumb__title').contains('dashboard').should('be.visible')
                cy.get('.dp__pointer').should('be.visible')
                cy.get('.d-flex > :nth-child(2)').contains('Today').should('be.visible')
                cy.get('.d-flex > :nth-child(3)').contains('Monthly').should('be.visible')
                cy.get('.d-flex > :nth-child(4)').contains('Yearly').should('be.visible')
            })
		})
        // test chart elements are present
        it('has chart', () => {
            cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > .v-container').within(($chart) => {
                cy.get('.chart > p').contains('Monthly sales')
                cy.get('.v-row > :nth-child(2)').contains('Total Earnings')
                .should('have.class', 'v-card-subtitle').and('be.visible')
                cy.get('.v-row > :nth-child(3)').contains('Orders this month')
                .should('have.class', 'v-card-subtitle').and('be.visible')
                cy.get('.v-row > :nth-child(4)').contains('Potential earnings')
                .should('have.class', 'v-card-subtitle').and('be.visible')
            })
		})
        // test whether order list table is present
        it('has order list', () => {
            cy.get(':nth-child(3) > .v-row > .v-col').within(($order) => {
                cy.get('thead').within(($thread) => {
                    cy.get(':nth-child(1)').contains('Order UUID').and('be.visible')
                    cy.get(':nth-child(2)').contains('Status').and('be.visible')
                    cy.get(':nth-child(3)').contains('# Ordered Products').and('be.visible')
                    cy.get(':nth-child(4)').contains('Customer').and('be.visible')
                    cy.get(':nth-child(5)').contains('Amount').and('be.visible')

                })
                cy.get('.mr-10').contains('Rows per page:').should('be.visible')
            })        
		})
	})

})