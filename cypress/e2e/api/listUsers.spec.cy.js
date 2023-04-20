describe('api get request to list users', () => {
    let invalidToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwcz'
    context('given INVALID token', () => {
		it('fails to list users', () => {
            cy.request({
                method: 'GET',
                url: Cypress.env('api_admin_list_users'),
                headers: { 'Authorization': 'Bearer ' + invalidToken},
                failOnStatusCode: false
            })
            .then((resp) => {
                expect(resp.status).to.eq(401)
                // check error message
                expect(resp.body).has.property('error','Unauthorized')
            })
        })

    })

    context('given valid token', () => {
		it('list users', () => {
            // binding token from the token command
            cy.adminAccessTokenAPI().then(accessToken => {
                cy.request({
                    method: 'GET',
                    url: Cypress.env('api_admin_list_users'),
                    headers: { 'Authorization': 'Bearer ' + accessToken}
                })
                .then((resp) => {
                    expect(resp.status).to.eq(200)
                    // check if the first user has all the properties
                    expect(resp.body.data[0]).has.property('first_name')
                    expect(resp.body.data[0]).has.property('last_name')
                    expect(resp.body.data[0]).has.property('email')
                    // check if the path has the correct url
                    expect(resp.body).has.property('path', Cypress.env('api_admin_list_users'))
                    // check if property total
                    expect(resp.body).has.property('total')
                })
    
            })
        })

    })
    
})