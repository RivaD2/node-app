# node-app
**Built a RESTful service with Node, Express and MongoDB, from setup to production with guidance from a Udemy course. My main goals for this app were to go further into the inner workings of Node and really solidify what I learned about back-end functionality and RESTful API's.**

**Udemy Course: Node.js: The Complete Guide to Build Restful API's.**

What was covered:
- Refresher on Node.js and architecture
- The Node module system
- NPM
- Building RESTful API's using Express
- Asynchronous JS
- CRUD Operations with MongoDB
- Mongoose Data Validation
- Modeling relationships between connected data
- Authentication and Authorization
- Handling and logging errors
- Integration Testing
- Test driven development


## Setup:

- Run `npm init`
  
**For the Express-demo you will need the below dependecies:**

`npm install nodemon joi _underscore pug helmet morgan`

- After `joi` is  installed, a schema is required to use it. Joi is a description language and and data validator for JS. You can read more about Joi [here](https://www.npmjs.com/package/joi) and [here](https://medium.com/@brunoluiz/joi-validate-input-and-define-databases-in-javascript-84adc6f1474b)
- `underscore` is a javascript library filled with useful functionional programming helpers. If you want to read more about how to use it, click [here](http://underscorejs.org/#contains)
- [Pug](https://pugjs.org/api/getting-started.html) is a template engine for Node.js. A template engine allows us to inject data and then produce HTML. 
- [Helmet. js](https://helmetjs.github.io/) is a useful Node. js module that helps you secure HTTP headers returned by your Express apps. 
- [Morgan](https://www.npmjs.com/package/morgan) is another HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. You can specify formats within the function for morgan
      - Everytime request is sent to server, it will be logged
      - Morgan logs requests to terminal but you can configure it to write it to a log file
  
**For the Mongo-demo you will to install the following:**

1. `npm install MongoDB  mongoose nodemon`
2. Create a schema and model(even though mongoDB is considered to be schemaless, we still built out a schema. You can read more about getting started with MongoDB [here](https://docs.mongodb.com/manual/tutorial/getting-started/)
  
3. **Connect to Database**

```
    mongoose.connect('mongodb://localhost/playground')

    //better to use debug module rather than console.log

    .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...',err));

```
### ENV requirements:

**For Mongo-demo, you will need:**
  
PORT=

MONGODB_URI=