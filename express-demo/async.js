module.exports = function asyncMiddleware(handler) {
    //this is a factory function
    //we pass a function reference below when we call the function
    return async(req, res, next) => {
        try{
            //handler needs req and res
           await handler(req, res);
        }
        catch(ex) {
            next(ex)
        };
    };
};