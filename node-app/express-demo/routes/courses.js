const express = require('express');
/*since route is in separate module, we will use 'router'
    - Router is a method that returns Router obj
    - Instead of working with app obj, we work with router obj
    - To use this: get router on top, add routes
    - export router at end of module
    - load courses module inside index.js module*/
const router = express.Router();


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


//getting list of courses
router.get('/', (req, res) => {
    //return array of nums
    res.send([1, 2, 3]);
});

/*get a single course using id of course we want and specifying a param with :
    - With express we can get query string params that we add in URL after the ?
    - Params are after the ? in URL
    - We use query string params to provide additional data for back end services
    - Query string params are for anything that is optional as well
    - Route params are used for essential or required values*/

//defining array of courses and the array has 3 course objects
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

//this endpoint gets all courses
router.get('/', (req, res) => {
    /* - In order to read param use :
       - For now we will send this to the client
    res.send(courses);
});

//getting single course from server
router.get('/:id', (req, res) => {
    /*example of using query params:
        - We use req.query to read params
        - These params are stored in obj with key value pairs
        - res.send(req.query);*/

    /*
        - find() method requires us to pass a function
        - This function will find a match to given criteria
        - If this course doesn't have a value, or if we don't find a course
           with an id, we should return response with HTTP status of 404 (obj not found)
        - Added in logic that will return boolean value
        - req.params.id will return a string and we need an integer
        - Used parseInto to turn string into integer
    */
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course was not found');
    // if we do have a course with id, return it to client
    res.send(course);
});

/*HOW TO RESPOND TO HTTP POST REQUESTS:
- I am going to post to collection of courses*/
router.post('/', (req, res) => {
    /*  - In route handler we need to read course obj that is in body of request
        - Use properties to create new course obj
        - Add new course object to courses array*/

    /*  - This new way of validating course goes in the route handler above
        - Moved all validate course logic to validateCourse()
        - So here, I call validateCourse, using object destructuring
        - If error, return 400 response to client*/
    const { error } = validateCourse(req.body); //equals result.error
     if(error)  return res.status(400).send(error.details[0].message);

    const course = {
        /* - Not working with database so I manually assign id
           - Get number of courses in courses array and add one to it*/
        id: courses.length + 1,
        /*   - Need to read this from body of request
             - Here I assume that req body has a name property
             - In order for this line to work, I need to enable parsing of JSON objects
               in body of request because by default it is not enabled in express
             - So at the top, I specify app.use(express.json());
             */
        name: req.body.name
    };
    //push course obj into course array
     courses.push(course);
     /* - When we post object to server, when server creates new resource,
           we should return that object in the body of the response
        - This is because we assign id on server, we need to return course obj
           to client because the client needs to know id of new resource*/
    res.send(course);
})

/*HOW TO UPDATE  A COURSE
    -need to add route param : since I am dealing with specific course*/
router.put('/:id', (req, res) => {

    /* - First look up course with given id
       - If course doesn't exist return 404(resource not found)
       - Otherwise, validate, if invalid, return 400 bad request*/
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course was not found');


    /* - New way of validating a course
       - This is object destructuring
       - To simplify object sent to client, I can go to details array
          and get first element and access message property*/
     const { error } = validateCourse(req.body); //equals result.error
     if(error) return res.status(400).send(error.details[0].message);



 //update course and return updated course
 course.name = req.body.name;
 res.send(course);
});


function validateCourse(course) {
    /* - With Joi, i first have to define schema to define shape of object
       - First define the schema*/
    const schema =  {
    /*  - Schema is set to course obj
        - I am telling Joi that the string should have min of three characters
           and that it is required*/
        name: Joi.string().min(3).required()
    };
     return  Joi.validate(course, schema);
}



//HOW TO DELETE A COURSE
//specifying param since I am deleting one course
router.delete('/:id', (req, res) => {
//Look up course with id and if not found, return 404 error
const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with given ID was not found');

    /*to delete one course, need to find index of course in courses array
       get index and store in const, and use splice to remove obj from courses array*/
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return response to client
    res.send(course);
});



//export router
module.exports = router;
