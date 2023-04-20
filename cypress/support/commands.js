
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

// -- Command to get the access token
Cypress.Commands.add('adminAccessTokenAPI', () =>{
    cy.request({
        method: 'POST',
        // passing the login endpoint, email and password from the .env
        url: Cypress.env('api_admin_login'),
        body: {
                email: Cypress.env('admin_email'),
                password: Cypress.env('admin_password')
            }
        
      })
      .then((resp) => {
        expect(resp.status).to.eq(200)
        // getting and returning the token
        const accessToken = resp.body.data.token
        return (accessToken)
    
      })

})