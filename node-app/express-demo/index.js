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

app.get('api/courses', (req, res) => {
    //return array of nums
    res.send([1, 2, 3]);
});

/*PORT
-use environment variable called PORT
-This value is set outside the application
- We need to add environment variable in terminal
- To set env var, in terminal, run export PORT=5000 (or what
    port you want nodemon to listen on)*/

const port = process.env.PORT || 3003;

/*give it a port number and optionally pass a function to call when app
starts listening on given port*/
app.listen(port, () => console.log(`'Listening on port ${port}`));

