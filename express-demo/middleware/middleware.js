
function middleware (req, res, next){
    console.log('Logging...');
    next();
};
//this module exports the middlware function
//I will load this module in index.js at the top;
module.exports = middleware;