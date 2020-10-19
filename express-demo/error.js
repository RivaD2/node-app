module.exports = function(err,req, res, next) {
    //log the exception
    res.status(500). send('something failed');
};