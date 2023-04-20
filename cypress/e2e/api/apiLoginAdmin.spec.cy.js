describe('api post request to login admin', () => {

    context('given INVALID user credentials', () => {
		it('fails to authenticate user', () => {
            cy.request({
                // declare POST method
                method: 'POST',
                // pass url, wrong email and password
                url: Cypress.env('api_admin_login'),
                body: {
                    email: "admin@gmail.com",
                    password: "wrongpassword"
                },
                failOnStatusCode: false
            })
            .then((resp) => {
                // confirm the response status is not successful
                expect(resp.status).to.eq(422)
                // confirm the error message
                expect(resp.body).has.property('error', 'Failed to authenticate user')
            })
        }) 
    })

    context('given valid user credentials', () => {
		it('user is authenticated', () => {
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
})