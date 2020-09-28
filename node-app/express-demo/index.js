//this represents our app
const express = require('express');
const app = express();
const cors = require('cors');

/*adding a piece of middleware
    -when I call express.json() this method returns middleware
    - then I call app.use to use middleware in request processing pipeline
    */
app.use(express.json());
// we have app.get, app.post, app.put, app.delete (methods)


/****************************************************** */
/*
//GET REQUESTS:

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
    res.send('Hello World');
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
    if(!course) res.status(404).send('The course was not found');
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
//to call http services, we use chrome extension called POSTMAN









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

