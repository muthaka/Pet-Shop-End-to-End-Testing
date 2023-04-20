
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

// Command to return second user email
Cypress.Commands.add('userEmail', () =>{
    // bind the token from the comand
    cy.adminAccessTokenAPI().then(accessToken => {
        
        cy.request({
            method: 'GET',
            url: Cypress.env('api_admin_list_users'),
            headers: { 'Authorization': 'Bearer ' + accessToken}
        })
        .then((resp) => {
            expect(resp.status).to.eq(200)
            const user_email = resp.body.data[1].email
            return (user_email)
        })

    })
})

// --Command to login user to the petshop UI
Cypress.Commands.add('loginUser', (email, password) => {
    // clear all cookies
    cy.clearCookies()
    // search for elements within form
    cy.get('.login__form.elevation-2').within(($loginwindow) => {
        // find email input element and type the admin email
        cy.get('input[class="v-field__input"]').first().clear().type(email)
        // find password input element and type the admin password
        cy.get('input[class="v-field__input"]').last().clear().type(password)
        // find the submit button and click
        cy.get('.v-btn').click()
    })
    
})