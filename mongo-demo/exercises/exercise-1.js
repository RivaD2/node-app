//load mongoose module
const mongoose = require('mongoose');


//connect to MongoDB database
mongoose.connect('mongodb://localhost/mongo-exercises');


/*Create schema:
   - the properties of this schema coorespond to shape of course documents
     that I added to database in MongoDB Compass
*/
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});


//create model with name of collection('Course', schema obj(courseSchema))
const Course = mongoose.model('Course', courseSchema);


//I can use the model to query courses
// I need to await this and store result, so I need to creat a async function
async function getCourses() {
    //I can simply return the result of the expression
    return await Course
    .find({ isPublished: true, tags: 'backend'})
    .sort({ name: 1 })
    .select({ name: 1, author: 1 })
}


//call getCourses function and bec it is an async function JS wrap result in a promise
//I don't necessarily need the run() function...getCourses will give us list of courses
async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run();

/* I got a list of courses that looked like this:

_id: 5a68fdc3615eda645bc6bdec,
name: 'Express.js Course',
author: 'Mosh'

*/
