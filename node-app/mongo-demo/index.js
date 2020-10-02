//load mongoose module

const mongoose = require('mongoose');


 //Connect to Database
mongoose.connect('mongodb://localhost/playground')
            //better to use debug module rather than console.log
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));



//Create a schema structure
   const courseSchema = new mongoose.Schema({
       // When this is stored, each obj in array will be key value pair
       // The key will be the index and the value will be the string
    name: String,
    author: String,
    tags: [ String ],
    //date.now will be default value
    date: { type: Date, default: Date.now},
    isPublished: Boolean
   });


/*Mongoose object has method called model() that takes two args
- First arg is the singular name of collection that the model is for
(collection of courses) but singular name is Course
- Second arg is the schema that defines shape of documents in this collection
*/
const Course = mongoose.model('Course', courseSchema);

/*
- I need to create course obj and in constructor and pass object to initialize the course obj
- In MongoDB I don't have to define a table, I just create an object and store it in the database
- Since I am using await, my code needs to be inside async function
*/
async function createCourse() {
    const course = new Course ({
        name: 'Angular Course',
        author: 'Riva',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

/*
- Course object has a method called save() and this will be an asyc operation
- The result of this operation will be ready in the future and so
    the method returns a Promise that I can await and then get the result
- This result is the course obj that is saved in database
*/
const result = await course.save();
console.log(result);
}


//Retrieving documents from mongoDB:
//This function will return a second object, the Angular Course as this gets all courses
async function getCourses() {
    //Course class has methods for querying documents
    const courses = await Course
        /*
            - find() gets list of documents
            - .find() returns a Document Query obj and it is like a promise so we can await it
            and get result
            - I can pass a filter in find() by adding key value pairs
        */
         .find({ author: 'Riva', isPublished: true})

        /*
        - using logical operator 'or' and I pass array of two objects
            that act as filters just like in .find()
        - Using or() I will get authors with Riva or courses that
          are published
        - The .and() method works in the same way
        */
        .or([ {author: 'Riva'}, {isPublished: true} ])
        //.and([ ])
        .limit(10)
        //indicates ascending order, descending is -1
        .sort({ name: 1})
        //selecting properties I want to return
        .select({ name: 1, tags: 1})
        //this log shows that I now only have three properties

    console.log(courses);
}

getCourses();
createCourse();





