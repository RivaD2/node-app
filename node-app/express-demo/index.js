//REQUIRE CALLS //DEPENDENCIES
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
//Joi is a class returned from the node module
const Joi = require('joi');
const middleware = require('./middleware');
const debug = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');



/*process is a global obj in node that gives us access to current process
    - this process obj has a prop called env which gives us environment vars
    - there is a standard env var called ENV
    - if it is not set, it will return undefined
    - we can set this to staging, testing or production*/
//Ex 1: console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
/*another way to get current environment is the app object:
    -this method uses env var to detect the current environment
    -if env var is not set, it will return DEVELOPMENT by default
    -app.get('env')
    -Ex 2: console.log(`app:${app.get('env')}`);
    - we want to enable logging of http requests only on
    development machine so, I need to say when to turn it on:*/
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

/* SO now if I set my environment var in terminal to production, and
run app again, morgan will not be enabled. To set env var in terminal:
    1) export NODE_ENV=production
    2) nodemon (then name of file to run)/*


/*MIDDLEWARE:
    -when I call express.json() this method returns middleware
    - then I call app.use to use middleware in request processing pipeline
    - middleware function takes a request obj and either returns response to client
    or passes control to another middleware function
    - In express, every route handler function we have (app.get()) is technically a middleware function
    - it terminates the request/response cycle
    - app.use(expres.json()) reads request when it is called
    - the job of this middleware function is to read request and if json obj is in body of request,
        it will parse the body of the req into json obj, and set request.body property
    - We can create custom middleware functions so that every request we get on server
    will go through the middleware function
    - middleware functions are called in sequence!
    -if middleware function does not pass control to another middlware
    function to end req/response cycle, our request will end up hanging...
    - Each middleware function should be in separate module
    */

app.use(express.json());

/*this is another built-in middleware function
    - this parses incoming requests with url encoded payloads
    - that is a request with a body like this:
                key=value&key=value
    - this is a traditional approach
    - if I have a html form with an input fields, and post form to server,
    the body of the request would look like the above.*/

app.use(express.urlencoded({extended : true}));

//passed middleware function
app.use(middleware);

/*static is another built in middleware function
    -static serves all static files like css,images etc.
    - I will put all static assets inside public folder
    - our static content is always at root of the site*/
app.use(express.static('public'));
app.use(helmet());

/************************ */
/* TEMPLATING ENGINES:
    - sometimes we will want to return html markup to the client
    - Templating engines come into play here
    - Mustache, pug, and EJS are most popular
    - For this demo I used pug to generate html and return it to client
    - npm i pug
    - have to set view engine for application
    - name of property is view engine and template is pug
    - express will internally load the module so we don't have to require it*/
app.set('view engine', 'pug');
//this is used to override the past templates
//all templates go in folder called views which is in root of application
app.set('views', './views')



/*************************************************************** */

/*CONFIGURATION:
    - Environments and storing config settings go hand-in-han and
        overriding these settings in each environment
    - In development environemnt I am going to use a different
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
    */

// config object has get() and arg to specify name of config property
console.log('Application Name:' + config.get('name'));

//I want mail server, I need to access 'host' in 'mail'. Used dot notation.
console.log('Mail Server:' + config.get('mail.host'));

/*never store passwords in configs file
    -store passwords in environment variables
    - For this exercise, I defined env password for mail server in terminal by entering:
            export app_password=(password here)
            then I ran nodemon index.js
    - in development env I manually set env variable
    - I store passwords in env var and then read them using config module
    - in config folder, I added folder customer-environment-variables.json
    - IN this file, I define the mapping of config settings to env vars
    - Below I displayed password of mail server by using dot notation
    - this config object looks at various sources to find value for config
    - the password is read from env variable*/

console.log('Mail Password:' + config.get('mail.password'));


/*I can specify formats within the function for morgan
    -everytime request is sent to server, it will be logged
    -morgan logs request to terminal but I can configure it to write it to log file
    -this will impact request processing pipeline, so maybe it is not best in production
    -it may only be best to use for short periods of time and then turn it off
 -by setting different environment variables and writing code to say
   when to turn it on based off current environment*/
app.use(morgan('tiny'));
/****************************************************** */

/*GET REQUESTS:

- Method(when building route) takes two args
- First is the path or url
- The second arg, is a callback function
- This function will be called when we have
    http get request to this endpoint
- This callback has two args, req, and res
- This is how we define a route:
     1)specify path or url and callback function (aka route handler)
     2)then we need to listen on a given port
*/

app.get('/', (req, res) => {
    //used pug template engine and used render to send html markup to client
    //when building RESTful services, we don't really need view engine/template engine
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

//getting list of courses
app.get('api/courses', (req, res) => {
    //return array of nums
    res.send([1, 2, 3]);
});

/*get a single course using id of course we want and specifying a param with :
- With express we can get query string params that we add in URL after the ?
- params are after the ? in URL
- We use query string params to provide additional data for back end services
- query string params are for anything that is optional as well
- route params are used for essential or required values*/

//defining array of courses and the array has 3 course objects
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

//this endpoint gets all courses
app.get('/api/courses', (req, res) => {
    //in order to read param use :
    //for now we will send this to the client
    res.send(courses);
});

//getting single course from server
app.get('/api/courses/:id', (req, res) => {
    //example of using query params
   //we use req.query to read params
   //these params are stored in obj with key value pairs
    // res.send(req.query);

    /*
    -find() method requires us to pass a function
    -this function will find a match to given criteria
    --if this course doesn't have a value, or if we don't find a course
    with an id, we should return response with HTTP status of 404 (obj not found)
    - added in logic that will return boolean value
    -req.params.id will return a string and we need an integer
    -Used parseInto to turn string into integer
    */
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course was not found');
    // if we do have a course with id, return it to client
    res.send(course);
});

/********************************************************** */

//HOW TO RESPOND TO HTTP POST REQUESTS:

//we are going to post to collection of courses
app.post('/api/courses', (req, res) => {
    /* in route handler we need to read course obj that is in body of request
        - use properties to create new course obj
        - add new course object to courses array*/

    /*this new way of validating course goes in the route handler above
    - moved all validate course logic to validateCourse()
    -so here, I call validateCourse, using object destructuring
    - if error, return 400 response to client*/
    const { error } = validateCourse(req.body); //equals result.error
     if(error)  return res.status(400).send(error.details[0].message);

    const course = {
        //not working with database so I manually assign id
        //get number of courses in courses array and add one to it
        id: courses.length + 1,
        /*need to read this from body of request
            -here I assume that req body has a name property
            -in order for this line to work, I need to enable parsing of JSON objects
             in body of request because by default it is not enabled in express
             - so at the top, I specify app.use(express.json());*/
        name: req.body.name
    };
    //push course obj into course array
     courses.push(course);
     /* when we post object to server, when server creates new resource,
     we should return that object in the body of the response
     - this is because we assign id on server, we need to return course obj
     to client because the client needs to know id of new resource*/
    res.send(course);
})
/*********************************************** */


//HOW TO UPDATE  A COURSE

//need to add route param : since I am dealing with specific course
app.put('/api/courses/:id', (req, res) => {

    //first look up course with given id
     //if course doesn't exist return 404(resource not found)
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course was not found');
    //otherwise, validate, if invalid, return 400 bad request

    //new way of validating a course
    //this is object destructuring
     /*to simplify object sent to client, I can go to details array
         and get first element and access message property*/
     const { error } = validateCourse(req.body); //equals result.error
     if(error) return res.status(400).send(error.details[0].message);



 //update course and return updated course
 course.name = req.body.name;
 res.send(course);
});

function validateCourse(course) {
    /*with Joi, i first have to define schema to define shape of object
     -first define the schema*/
    const schema =  {
    /*schema is set to course obj
        -telling Joi that the string should have min of three characters
         and that it is required*/
        name: Joi.string().min(3).required()
    };
     return  Joi.validate(course, schema);
}

/**************************************** */

//HOW TO DELETE A COURSE
//specifying param since I am deleting one course
app.delete('/api/courses/:id', (req, res) => {
//Look up course with id and if not found, return 404 error
const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given ID was not found');

    //to delete one course, need to find index of course in courses array
    //get index and store in const, use splice to remove obj from courses array
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return response to client
    res.send(course);
});



/*PORT
-use environment variable called PORT
-This value is set outside the application
- We need to add environment variable in terminal
- To set env var, in terminal, run export PORT=5000 (or what
    port you want nodemon to listen on)*/

const port = process.env.PORT || 3000;

/*give it a port number and optionally pass a function to call when app
starts listening on given port*/
app.listen(port, () => console.log(`Listening on port ${port}...`));

