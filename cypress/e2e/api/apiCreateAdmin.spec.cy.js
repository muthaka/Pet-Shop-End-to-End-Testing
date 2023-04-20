// function to generate email
function randomEmail (email_domain){
    let random_name = ""
    var pattern = "abcdefghijklmnopqrstuvwxyz"
    for (var i = 0; i < 8; i++){
        random_name += pattern.charAt(Math.floor(Math.random() * pattern.length))
    }
    return random_name + email_domain

}

describe('api post request to create admin', () => {
    
    context('given existing email', () => {
		it('fails to create admin', () => {
            // token command
            cy.adminAccessTokenAPI().then(accessToken => {
                //bind data from the admin.json fixture
                cy.fixture('admin').then((admin) =>{
                    cy.request({
                        method: 'POST',
                        url: Cypress.env('api_admin_create'),
                        headers: { 'Authorization': 'Bearer ' + accessToken},
                        body: {
                            first_name: admin.first_name,
                            last_name: admin.last_name,
                            email: admin.existing_email,
                            password: admin.password,
                            password_confirmation: admin.password_confirmation,
                            avatar: admin.avatar,
                            address: admin.address,
                            phone_number: admin.phone_number,
                            marketing: admin.marketing
                        },
                        failOnStatusCode: false

                    })
                    .then((resp) => {
                        expect(resp.status).to.eq(422)
                        expect(resp.body).has.property('error', 'Failed Validation')
                        expect(resp.body.errors.email).contains('The email has already been taken.') 
                    })
                })
            })
        })
    })

    context('given new email', () => {
		it('admin is created', () => {
            // token command
            cy.adminAccessTokenAPI().then(accessToken => {
                //bind data from the admin.json fixture
                cy.fixture('admin').then((admin) =>{
                    // pass the generated email from the randomEmail function
                    const email = randomEmail(admin.email_domain)
                    cy.request({
                        method: 'POST',
                        url: Cypress.env('api_admin_create'),
                        headers: { 'Authorization': 'Bearer ' + accessToken},
                        body: {
                            first_name: admin.first_name,
                            last_name: admin.last_name,
                            email: email,
                            password: admin.password,
                            password_confirmation: admin.password_confirmation,
                            avatar: admin.avatar,
                            address: admin.address,
                            phone_number: admin.phone_number,
                            marketing: admin.marketing
                        }
                    })
                    .then((resp) => {
                        expect(resp.status).to.eq(200)
                        expect(resp.body.data).has.property('first_name', admin.first_name)
                        expect(resp.body.data).has.property('last_name', admin.last_name)
                        expect(resp.body.data).has.property('email', email)
                        expect(resp.body.data).has.property('address', admin.address)
                        expect(resp.body.data).has.property('phone_number', admin.phone_number)    
                    })
                })
            })
        })
    })
})