# CodeCrafters Backend

This repo forms the back end section of our application Junket that team CodeCrafters made during the project phase of our time at NorthCoders. This links repo provides a RESTful API that is called by our Android App built with React Native (see below).

Link to the hosted version: 
https://codecrafters-9qyn.onrender.com/api

Link to the frontend repository: 
https://github.com/Sir1ys/codecrafters-fe

## FORK THIS REPOSITORY: 
- In the top-right corner of the page, click Fork. 
- Under "Owner," select the dropdown menu and click an owner for the forked repository. 
- Click Create fork.

## CLONE YOUR FORK LOCALLY: 
- On GitHub.com, navigate to your fork of the Codecrafters-be. 
- Above the list of files, click Code. 
- Copy the URL for the repository. 
- Open Terminal. 
- Change the current working directory to the location where you want the cloned directory. 
- Type git clone, and then paste the URL you copied earlier. 
- Press Enter. Your local clone will be created.

## INSTALL DEPENDENCIES: 
- after opening the repository in VS Code navigate to your terminal and run the following commands: 
    * npm install

## ADD THE FOLLOWING FILES AT THE TOP LEVEL OF THE MAIN FOLDER: 
- .env.test with PGDATABASE=cc_test as the environment variable. 
- .env.development with PGDATABASE=cc_development as the environment variable.

## SEED THE DATABASE: 
- in your terminal run following commands: 
    * npm run setup-dbs 
    * npm run seed

## RUN THE TESTS: 
- in your terminal run following commands: 
* npm run test utils.test.js (to run utils tests) 
* npm run test users.test.js (to run single test file)
* npm run test (to run all test files)

The minimum version of Node.js to run the project is >=20.5.1
The minimum version of Postgres to run the project is >=8.0

