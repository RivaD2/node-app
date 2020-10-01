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
mongoose.connect('mongodb://localhost/playground')
            //better to use debug module rather than console.log
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));