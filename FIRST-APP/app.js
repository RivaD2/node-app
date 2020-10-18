
/* NOde module system:
    - operating system
    - file system
    - events
    - http
    - How to create modules
    */
//    console.log();// a global obj and can be accessed in any file
//    setTimeout(); //call a function after delay, can use this on client or inside browser or node
//    clearTimeout();
//    setInterval();

/* all functions above belong to window object
 - when we declare var, that var is available via the window obj
- In node, we DO NOT HAVE THE WINDOW OBJECT
- With node, we have another object called 'global'*/

// var message = '';
// console.log(global.message);
/*this would return undefined
- WHY?
    The vars and functions are not added to global obj
    - they are only scoped to THIS FILE
    - This is because of Node's modular system
    */
/*
   -in order to build reliable apps, we should aboid defining vars in global scope
   -Instead we need modularity, create small modules where we define vars and functions
   - This way, vars and functions with same name don't override others
   - At core of node, is concept called module
   - Every file in node app is considered a module
   - vars and functions are only scoped to that file and are 'private'
   - IF you want to use a var or function in another module, outside that module
   you have to export it and make it 'public'
*/


//loading logger module:
//this require function returns the obj that is exported from target module
const log = require('./logger');
const path = require('path');
const os = require('os');
const fs = require('fs');//filesystem

/*************************************** */
//In the real world, we will  not use http module to build back end service
// as we add more routes, the code will be too complex
// instead we use express which gives app clean structure
// The express framework is built on top of http module in NODE
const http = require('http');

//this is an EventEmitter as well
// the server object raises events that we can respond to
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    /*- to build back end service, we will have to handle
    various routes
    - here, we want to return list of courses from database
    - here, we want to return an array of objects using JSON
    */
    if(req.url === '/api/courses') {
        //pass array to JSON
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
});

server.listen(3002);
console.log('Listening on port 3002...');
/****************************************************** */

//EventEmitter is caps bec it is in an indicator that EventEmitter is a class
// a class is a container for properties and methods
//to use EventEmitter, I need to create an instance of this class
const EventEmitter = require('events');

    /*emitter is an object (an instance of a class)
    - However, we don't want to work this directly
    - We want to work with Logger object*/
//const emitter = new EventEmitter();


//Here I need to load logger module and call log function
// When requiring logger module, we get a class so I add 'Logger'
const Logger = require('./logger');
/* Create the object
    -We are using of instance of custom class we defined rather
    than EventEmitter instance*/
const logger = new Logger();
//log the message by calling method

/*Here I register the listener and it takes two args
    - the first arg is the name of the event
    - the second arg is the callback function or actual listener
    - if listener is registered after calling emit method, it will not work
    - The order does matter so it needs be listener then the event raised
    - This event listener is ONLY registered to the emitter above!
    - However, after the logger class is made, we say 'Hey logger, when we
    raised message log event, execute this code! and it is registered to logger obj"
    */
   logger.on('messageLogged', (arg)  => {
    console.log('Listener called', arg);
});

logger.log('message');

/*********************************************************** */

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
/*
the logs above return:
Total Memory: 8589934592
Free Memory: 71032832
- We can get info about OS using Node
- Our JS is executed on the server or outside of the browser
{*/

const pathObj = path.parse(__filename);
console.log(pathObj);
/*this returns:
{
  root: '/',
  dir: '/Users/riva/repos/personal-projects-and-practice/node-app',
  base: 'app.js', //name of file
  ext: '.js', name of extension
  name: 'app'
} this is the path obj, with some useful properties
*/

/************************************************** */
//this is the synchronous form
const files = fs.readdirSync('./');
console.log(files);
/* This console will return all files and folders in current
folder in the form of array: [ 'app.js', 'logger.js' ]*/

/*BELOW IS THE ASYNCHRONOUS FORM AND IS PREFERRED:
    -all async methods require a callback function as last arg
    -Node will call function when asynch function completes
    -To work with files, we will need to require 'fs' module
    - then use one of the methods, which come in pairs (async or sync)
    - ALWAYS USE asynchronous methods or non- blocking methods
    */
fs.readdir('./', function(err, files) {
    if(err) console.log('Error', err);
    else console.log('Result', files);
});
//this returns  an obj and a single method of log
//we can call this method in app.js



//we are calling the log function from logger.js
// log('message');

//when we define a module, we export one or more members
// We then load the module by using the require function
//jshint will scan js code for errors
