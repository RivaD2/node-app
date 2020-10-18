const mongoose = require('mongoose');


//connect to MongoDB database
mongoose.connect('mongodb://localhost/mongo-exercises');


//Create schema:

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



async function getCourses() {
    //returned result of expression
    return await Course
    /*GET ALL PUBLISHED FRONTEND AND BACKEND COURSES
        - I can't simply pass an array of two strings into tags: ['frontend', 'backend']
        - I need to use the 'in' operator*/

    //can use or operator here so that all courses are published
    .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
    //set price in descending order by using -1
    .sort({ name: -1 })
    //got name and author and price by setting it to a string
    //the most expensive course will come first
    .select('name author price')
}


//call getCourses function and bec it is an async function JS wrap result in a promise
//I don't necessarily need the run() function...getCourses will give us list of courses
async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run();
