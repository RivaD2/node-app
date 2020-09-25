//(function (exports, require, module, __filename, __dirname) {
    //the require function is local to each module
    // this function is the module wrapper function
    //node does not execute code directly, but wraps code inside function
console.log(__filename);
console.log(__dirname);


const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

/* We want to create a class that has all capabilites of EventEmitter
    - but it will have additional capabilites
    - We want to create a class called Logger that thas the method of log*/

    /*Logger still needs all capabilites of EventEmitter Class
        - so we will use the keyword of 'extends'*/
class Logger extends EventEmitter {
     log(message) {
        //Send an HTTP request
        console.log(message);

    /*signaling that event has happened by passing arg which is the name of event
        - typically with an event, we want to send some sort of data
        - To send multiple values in event, encapuslate those values in an obj.
        - In the event listner, the function would receive the arg used in event
        - Typically the arg is called arg, or eventArg
        - Because we used 'extends' we can use the keyword 'this'
        - In this class, we can directly emit or raise events
        */
      this.emit('messageLogged', {id:1,  url:'http://'});
     }

};
//exporting logger class
module.exports = Logger;


/*
- both of these are scoped to this module (they are 'private');
-in app.js we want to use this module
-we should be able to use the logger module in app.js
- to access the log function by calling it from app module
we have to make it 'public'
- We have the module object and a property of 'exports'
- the property is set to an empty object
- Anything that is added to that object,
is exported from the module and avail outside of this module.
- We will use a method to do this:
*/

//adding method of log to exports obj
// setting it to log function above
// the object we are exporting has single method of log

//module.exports.log = log;
//if we export the url, we may call it endPoint
// we only want to export subset of members to outside
// NOW, we NEED TO LOAD MODULE AND USE IT IN app.js


//Sometimes we may only want to export a function:
//module.exports = log;

//exports.log = log;
//can't write exports = log because exports is a reference to module.exports


