//this represents our app
const express = require('express');
const app = express();
// we have app.get, app.post, app.put, app.delete (methods)


/*
- method(when building route) takes two args
- first is the path or url
- The second arg, is a callback function
-this function will be called when we have
    http get request to this endpoint
- This callback has two args, req, and res
- this is how we define a route:
    - specify path or url and callback function (aka route handler)
    - then we need to listen on a given port
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

app.get('/api/courses/:id', (req, res) => {
    //in order to read param use:
    //for now we will send this to the client
    res.send(req.params.id);
});

//example of using query params
app.get('/api/posts/:year/:month', (req, res) => {
   //we use req.query to read params
   //these params are stored in obj with key value pairs
    res.send(req.query);
});




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

