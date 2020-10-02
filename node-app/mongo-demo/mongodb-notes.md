# MongoDB Notes

1. **Load mongoose module**
    - Mongoose is an obj that has method called connect
    - Pass connection string that is hardcoded
    - In a real project, I would have a different connection string for production environment
    - Usually, this string would come from a config file
    - Playground is the name of our database
    - I have not created it yet, but the first time something is written to database,
            mongo will create it for us.
    - This method retruns a Promise
 

2. **Connect to Database**

    ```
    mongoose.connect('mongodb://localhost/playground')
            //better to use debug module rather than console.log
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

    ```
3. **Create a schema (even though mongoDB is schemaless, we still need a schema)**

    - I created the database called playground
    - In database I will have collection called courses
    - A collection is like a table in a relational database
    - In the collection, I have 3 documents
    - A document in MongoDB is like a row in a relational database
    - SO, in mongoDB I have collections and documents
    - Each document is a container of key value pairs
    - In mongoose, we have schema (not part of MongoDB)
    - We use schema to define shape of documents

4. **Once I have a schema, I need to compile schema into a model and the model 
gives me a  class**

    - Then I can create an obj based on class and obj maps to document in mongoDB database
    - First, an obj is an instance of a class, the class is a blueprint, and obj
        is instance of that blueprint
    - So, I need to create a class called course and then create instances of that class (like nodeCourse)
    - Then I can save nodeCourse to the database
    - Mongoose object has method called model() that takes two args
            - First arg is the singular name of collection that the model is for (collection of courses)
                but singular name is Course
            - Second arg is the schema that defines shape of documents in this collection
            `const Course = mongoose.model('Course', courseSchema);`

5. **Next, create the course obj and in the constructor pass an object to initialize the course obj**

    - In MongoDB I don't have to define a table, I just create an object and store it in the database
    - Since I am using await, my code needs to be inside async function

6. **About the course object**

    - Course object has a method called save() and this will be an asyc operation
    - The result of this operation will be ready in the future and so
       the method returns a Promise that I can await and then get the result
    - This result is the course obj that is saved in database
    - When course is saved in mongoDB, mongoDB will assign unique identifier to
        the course obj/document
    - With this, I can see id that is assigned

7. **Building a more complex query with logical operators**

     - What if the Courses object has a price property?
     - I can replace a simple value with object to express a concept:
            - Using .find() I will return courses with prices with different values
            ` .find({ price: {$gte: 10, $lte: 20 } })`
     - If I wanted courses that are 10, 15 or 20 dollars:
            - I would use find() and pass in object with array values
            `.find({ price: {$in: [10, 15, 20] } })`
        
            - I can customize a query by applying `limit()`, `sort(by passing object)`,
               and selecting properties that I want to return using `select()`
            - This is all part of building a more complex query
    

    