# NOTES

## SEMANTIC VERSIONING

/*

    - major version, minor version, patch version
    - EX; "mongoose":"^4.13.6" or 4.x or Tilde ~4.13.6
    - The caret tells NPM that we are interested in
    - ANY version of mongoose as long as the major version is 4. If
      there is a newer, minor or patch version, we want that as well.




    - npm list --depth=0 (shows me all my dependencies)
    - npm view mongoose dependencies (this wills how us list of dependencies in packages)
    - npm list mongoose versions (this will show me a list of ALL the versions)
    - to set a version npm i mongoose@2.4.2(json will update)
  */


UPDATING LOCAL PACKAGES

/*

    - newer versions of dependencies will come out as we work on projects
    - (in terminal) run npm outdated
    - NPM looks at versions of dependencies and compares them to what is there
    in the NPM registry
    - (in terminal) npm update (this only works for updating minor and patch releases)
    - (in terminal) sudo npm install -g npm-check-updates
    -(in terminal) npm check updates (this will show us all outdated packages and their newest versions)
    - (in terminal)run ncu (aka npm check updates) and run ncu -u to update package json
    - once everything is updated, I still have to run npm i

*/

DEV DEPENDENCIES:

/*

    - Sometimes there are dependencies only used in development stages
    - These are dev dependencies and should not go into production environment
    - These are still listed in node modules and package.json
*/

 UNINSTALLING A PACKAGE

   // - npm uninstall or npm un mongoose (for example)*/


WORKING WITH GLOBAL PACKAGES

/*

    - npm is a global package as we can run it in any folder
    - angular cli is also global
    - to install package globally, use npm i -g npm (this will update npm)
    - I can run npm -g outdated to see all outdated global packages
*/

HOW TO PUBLISH MY OWN PACKAGES TO NPM
REGISTRY

/*

    - first created new folder mkdir lion-lib
    - cd lion-lib/
    - npm init --yes
    - open folder since we have a package.json now
    - open new file index.js or whatever file will be the entry point
    - `module.exports.add = function(a, b) {
        return a + b}
    };`

    - npm login (to login to account)
    - enter username
    - enter password
    - enter email
    - then to publish package, run npm publish
    - go into package.json, use a unique name
    - in terminal, run npm publish
    - Now I can use this package.json in another folder

*/

 HOW TO PUBLISH NEWER VERSIONS OF PACKAGES TO NOM REGISTRY

/*

    - module.exports.multiply = function(a, b) {
        return a + b}
    };
    - you can't publish over another version
    - in package.json we can manually update version
    - we can also run npm version major, minor or patch
    - Ex: nopm version minor
    - npm publish

*/

## BUILDING RESTful SERVICES

/*

    - Most if not all apps follow the client server architecture
    - The app is the front-end or the client
    - Under the hood, it needs to talk to server, to get or save the data
    - This happens by using the HTTP protocol
    - On server, we expose services that are accessible via the HTTP protocol
    - The client can then call these services by sending HTTP requests
    - Rest is short for Representational State Transfer
    - We use HTTP protocol principles to provide suppprt to:
                -  CREATE, READ, UPDATE, AND DELETE
    - These ops are known as CRUD operations
    - Client can send requests to an endpoint (http, or https://)
    - If you want data to be transferred on secure channel, use https://

    - for example: 'https://vidly.com/api/customers'
    - the domain is the vidly.com/api exposes the restful service/customers is a resource or a collection of customers we have in our application
    - This is our endpoint
        to work with customers. All operations revolving around customers would be done
        by sending http request to this endpoint. The type of http request depends on the operation.
    - These requests will be one of the HTTP METHODS: GET, POST, PUT, DELETE

    **for example: GET/api/customers ----> would return something like this:**

        {
        {id: 1, name: ''}
        {id: 1, name: ''}
        } ;

    **if we want a single customer then we need to specify that
        customer in the address:**

        GET/api/customers/1 ------> would return:

        {id: 1, name: ''};`



        - to update a customer we need to send PUT request and specify the endpoint
        - include cusotmer object in body of the request and the specified id of customer to
        be updated
        - to delete, we hae to send a delete request along with an id
        - To add a new customer, we would use POST

*/

## USING POSTMAN

/*

    - to call http services, we use chrome extension called POSTMAN
    - I went to postman and added in post route with url of 'http://localhose:5000/api/courses'
    - I clicked on 'body' tab and selected 'raw' and then 'JSON' to put JSON in body of request
    - I put JSON object in body and added name prop in object:

        {
            "name": "new course"
        }
        - after clicking send, the body of response was this:

            {    //now we have four courses in our array
                "id": 4,
                "name": "new course"
            }
    - in this implementation I assumed that there is an obj with name prop in
            body of request
            -what if client forgets to send prop or sends invalid name?
            - that is where input validation comes in*/

    */

## INPUT VALIDATION

/*

    - as a best practice, never trust what client sends you
    - I should always validate input
    - in this example, because I am dealing with a simple obj with one prop of name,
            I can write some validation logic in the post route.
    - in the real world, objects will be more complext
    - we don't want validation logic to be too complex at beginning of route handler
    - node has a package that makes validation easy
    - so i ran npm i joi
    - I loaded the module at the top of the page and stored it in const Joi
    - Joi is a framework, and can be used in any type of node project. This is great for people using express or restify, for example.
    - Besides user validation, Joi can be used to define database schemas

*/

## CONFIGURATION

/*

    - Environments and storing config settings go hand-in-hand and
    overriding these settings in each environment
    - In development environment I am going to use a different
    database or mail server
    - so I learned how to use config settings and how to override them
    - I used npm config for this
    - I created three different files(environment files) in config folder
            1) one file was for default config settings
            2) the second file was used to define settings specific
                for development environment. I can override settings defined
                in default.json and add additional settings
            3) the third file is production.json
    - I then loaded the config module at the top of file storing it in const
    - config object has get() and arg to specify name of config property

    **never store passwords in configs file**

    - store passwords in environment variables
    - For this exercise, I defined env password for mail server in terminal by entering:
            export app_password=(password here)
            then I ran nodemon index.js
    - in development env I manually set env variable
    - I store passwords in env var and then read them using config module
    - in config folder, I added folder customer-environment-variables.json
    - IN this file, I define the mapping of config settings to env vars
    - Below I displayed password of mail server by using dot notation
    - this config object looks at various sources to find value for config
    - the password is read from env variable
*/

## USING MORGAN

/*

    - I can specify formats within the function for morgan
    - everytime request is sent to server, it will be logged
    - morgan logs requests to terminal but I can configure it to write it to log file
    - this will impact request processing pipeline, so maybe it is not best in production
    - it may only be best to use for short periods of time and then turn it off
    - by setting different environment variables and writing code to say
    - when to turn it on based off current environment

*/

## MIDDLEWARE /(express.json()),express.static(), express.urlencoded()) etc.

/*

    - When I call express.json() this method returns middleware
    - Then I call app.use to use middleware in request processing pipeline
    - A middleware function takes a request obj and either returns response to client
    or passes control to another middleware function
    - In express, every route handler function we have (app.get()) is technically a middleware function
    - It terminates the request/response cycle
    - app.use(expres.json()) reads request when it is called
    - The job of this middleware function is to read request and if json obj is in body of request, it will parse the body of the req into json obj, and set request.body property
    - We can create custom middleware functions so that every request we get on server
    will go through the middleware function
    - Middleware functions are called in sequence!
    - If middleware function does not pass control to another middlware
    function to end req/response cycle, our request will end up hanging...
    - Each middleware function should be in separate module
*/

## GET REQUESTS

/*

    - app.get() is a method(used when building route) that takes two args
    - First is the path or url
    - The second arg, is a callback function
    - This function will be called when we have http get request to this endpoint
    - This callback has two args, (req, res)
    - This is how we define a route:
        1) specify path or url and callback function (aka route handler)
        2) then we need to listen on a given port

*/

## SETTING UP SERVER

/*

    - Use environment variable called PORT
    - This value is set outside the application
    - We need to add environment variable in terminal
    - To set env var, in terminal, run export PORT=5000 (or what
        port you want nodemon to listen on)*/

    `const port = process.env.PORT || 3000;`
    //give it a port number and optionally pass a function to call when app
    starts listening on given port

    `app.listen(port, () => console.log(`Listening on port ${port}...`));`

*/

## URLENCODED

/*

    - this is another built-in middleware function
    - this parses incoming requests with url encoded payloads
    - that is a request with a body like this:
                    key=value&key=value
    - this is a traditional approach
    - if I have a html form with an input fields, and post form to server,
        the body of the request would look like the above

*/

## ENV/GETTING CURRENT ENVIRONMENT/CHANGING OUR ENVIRONMENT IN TERMINAL

/*

    **process' is a global obj in node that gives us access to current process**

        - This process obj has a prop called env which gives us environment vars
        - There is a standard env var called ENV
        - If it is not set, it will return undefined
        - We can set this to staging, testing or production*/
    //Ex 1: console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    /*another way to get current environment is the app object:
        - This method uses env var to detect the current environment
        - If env var is not set, it will return DEVELOPMENT by default
        - app.get('env')
        - Ex 2: console.log(`app:${app.get('env')}`);
        - We want to enable logging of http requests only on
        development machine so, I need to say when to turn it on.
        For example, when using morgan, I can say:

    if(app.get('env') === 'development') {
            app.use(morgan('tiny'));
            debug('Morgan enabled');
        }

    - SO now if I set my environment var in terminal to production, and
     run app again, morgan will not be enabled. To set env var in terminal:

      1) export NODE_ENV=production
      2) nodemon (then name of file to run)

*/

## TEMPLATING ENGINES

/*

    - Sometimes we will want to return html markup to the client
    - Templating engines come into play here
    - Mustache, pug, and EJS are most popular
    - For this demo I used pug to generate html and return it to client
    - npm i pug
    - To use templating engine, I have to set view engine for application
    - The name of the property is 'view engine' and template I used is pug
    - Express will internally load the pug module so we don't have to require it

   `app.set('view engine', 'pug');`
        -this is used to override the past templates
        -all templates go in folder called views which is in root of application
    `app.set('views', './views');`
    - when building RESTful services, templating engines are not necessarily needed

*/
