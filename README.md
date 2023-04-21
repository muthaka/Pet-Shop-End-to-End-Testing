# Pet Shop End-to-End (E2E) testing
Standalone Cypress suite to test the [PetShop API](https://pet-shop.buckhill.com.hr/api/swagger) and PetShop UI{[Admin UI](https://pet-shop.buckhill.com.hr/login) and [User UI](https://pet-shop.buckhill.com.hr/)}

API test covered are:
a. Login admin account
b. Create admin account
c. list all users

UI test covered are:
a. Login admin 
b. Login user
c. Admin dashboard


Dependencies
------------
Tests runs on:
1. Node Version: v16.0.0
2. npm Version: 7:10.0
3. Cypress Version: 12.7.0

## Requirements to run the tests
1. Node must be installed in your device
**how to install node.js:**
* [download node.js](https://nodejs.org/en/download)

## command to check node version 
```json
node -v
```

2. npm must be installed
**how to install npm:**
* [installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## command to check npm version 
```json
npm -v
```

# Running the Tests


### 1. Clone this repo

If you want to run the tests you'll need to [clone](https://github.com/muthaka/Pet-Shop-End-to-End-Testing) it first.

After cloning this project in `Github`, run these commands:

```bash
## clone this repo to a local directory
git clone https://github.com/muthaka/Pet-Shop-End-to-End-Testing.git

## cd into the cloned repo
cd Pet-Shop-End-to-End-Testing

## install the node_modules
npm install

```
### 2. Run the tests
The project is now on your device and tests can be ran.
On the root directory of the project *Pet-Shop-End-to-End-Testing* using your terminal:

```bash
# launch the cypress tests in headless mode using the commands
command 1
npm run cy:run 

command 2
npx cypress run

```

**Learn more cypress commands to run the tests:**  
[cypress command-Line](https://docs.cypress.io/guides/guides/command-line) 
