//looad mongoose module

const mongoose = require('mongoose');
/*  - Mongoose is an obj that has method called connect
    - Pass connection string that is hardcoded
    - In a real project, I would have a different connection string for production environment
    - Usually, this string would come from a config file
    - Playground is the name of our database
    - I have not created it yet, but the first time something is written to database,
            mongo will create it for us.
    - This method retruns a Promise
 */



 //Connect to Database
mongoose.connect('mongodb://localhost/playground')
            //better to use debug module rather than console.log
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));



/*Create a schema (or rather a schemaless structure)
    - I created the database called playground
    - In database I will have collection called courses
    - A collection is like a table in a relational database
    - In the collection, I have 3 documents
    - A document in MongoDB is like a row in a relational database
    - SO, in mongoDB I have collections and documents
    - Each document is a container of key value pairs
    - In mongoose, we have schema (not part of MongoDB)
    - We use schema to define shape of documents
    */
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



/* Once I have a schema, I need to compile schema into a model and the model gives me a class
   - Then I can create an obj based on class and obj maps to document in mongoDB database
    - First, an obj is an instance of a class, the class is a blueprint, and obj
        is instance of that blueprint
    - So, I need to create a class called course and then create instances of that class (like nodeCourse)
    - Then I can save nodeCourse to the database
    - Mongoose object has method called model() that takes two args
            - First arg is the singular name of collection that the model is for (collection of courses)
                but singular name is Course
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
    - When course is saved in mongoDB, mongoDB will assign unique identifier to
        the course obj/document
    - With this, I can see id that is assigned

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
        /*  - Imagining that courses have price property:
                - replaced a simple value with object to express a concept
                - Using .find() I will return courses with prices with different alues
                - .find({ price: {$gte: 10, $lte: 20 } })
            - If I wanted courses that are 10, 15 or 20 dollars:
                - I would use find() and pass in object with array values
                .find({ price: {$in: [10, 15, 20] } })
        /*
            - Customizing query by applying limit, sorting(by passing object),
               and selecting properties that I want to return
            - This is all part of building a more complex query
        */
        /*
        - using logical operator or and I pass array of two objects
            that act as filters just like in .find()
        - Using or() I will get authors with Riva or courses that
          are published
        - The .and() method works in the same way
        */
        .or([ {author: 'Riva'}, {isPublished: true} ])
        .and([ ])
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





