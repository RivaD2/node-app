//REQUIRE CALLS //DEPENDENCIES
const error = require('./middleware/error');
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');
//Joi is a class returned from the node module
const Joi = require('joi');
const middleware = require('./middleware/middleware');
const debug = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes.home')

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//passed middleware function
app.use(middleware);
app.use(express.static('public'));
app.use(helmet());
/* Here we supply two args, a path, and the router object that we imported
    - we are telling Express that any routes that start with api/courses,
       use this router. The router that we loaded from the courses module.*/
app.use('/api/courses', courses);
app.use('/', home);
//passing reference to error handler function
app.use(error);





/* TEMPLATING ENGINES:

    - Sometimes we will want to return html markup to the client
    - Templating engines come into play here
    - Mustache, pug, and EJS are most popular
    - For this demo I used pug to generate html and return it to client
    - npm i pug
    - I have to set view engine for application
    - Name of property is view engine and template is pug
    - Express will internally load the module so we don't have to require it*/
app.set('view engine', 'pug');
//this is used to override the past templates
//all templates go in folder called views which is in root of application
app.set('views', './views')



//CONFIGURATION:

// config object has get() and arg to specify name of config property
console.log('Application Name:' + config.get('name'));
//I want mail server, I need to access 'host' in 'mail'. Used dot notation.
console.log('Mail Server:' + config.get('mail.host'));

/*
- Below I displayed password of mail server by using dot notation
- This config object looks at various sources to find value for config
- The password is read from env variable*/
console.log('Mail Password:' + config.get('mail.password'));


/*I can specify formats within the function for morgan
    - Everytime request is sent to server, it will be logged
    - Morgan logs request to terminal but I can configure it to write it to log file
    - This will impact request processing pipeline, so maybe it is not best in
      production
    - It may only be best to use for short periods of time and then turn it off
    - By setting different environment variables and writing code to say
      when to turn it on based off current environment*/

   /*we want to enable logging of http requests only on
    development machine so, I need to say when to turn it on:*/
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}

/*
   - SO now if I set my environment var in terminal to production, and
    run app again, morgan will not be enabled. To set env var in terminal:
        1) export NODE_ENV=production
        2) nodemon (then name of file to run)*/
app.use(morgan('tiny'));




/*PORT
    - Using environment variable called PORT
    - This value is set outside the application
    - I need to add environment variable in terminal
    - To set env var, in terminal, run export PORT=5000 (or what
        port you want nodemon to listen on)
*/

const port = process.env.PORT || 3000;

/*give it a port number and optionally pass a function to call when app
starts listening on given port*/
app.listen(port, () => console.log(`Listening on port ${port}...`));

