describe('api post request to login admin', () => {

    it('login admin user', () => {
        cy.request({
            // declare POST method to send email and password
            method: 'POST',
            // url, email and password passed from the .env file
            url: Cypress.env('api_admin_login'),
            body: {
                email: Cypress.env('admin_email'),
                password: Cypress.env('admin_password')
            }
        })
        .then((resp) => {
            // confirm the response status is successful
            expect(resp.status).to.eq(200)
            // confirm that the token is returned
            expect(resp.body.data).has.property('token')
        })

        
	})

})