/*
    -Sometimes we want to create a promise that is already resolved
    -I want to simulate scenario where an async operation, like
        calling a web service completes successfully
    - In my unit test, I want to create a Promise that is already resolved:
    */

//Promise class has static method called resolve
//this will return Promise that is already resolved
const promise = Promise.resolve({id: 1 });
//call .then to get result and display on console
promise.then(result => console.log(result));

/*Simularly, I might want to create a Promise that
is already rejected.
    - Instead of calling resolve, I will call reject
    */
const rejectedPromise = Promise.reject(new Error('reason for rejection...'));
rejectedPromise.catch(err => console.log(err));
/*this error message will show the error and  the callstack
that comes with every error object in JS
    - If I passed just the string without 'new Error' I will
    not see the callstack
    - When rejecting Promises, I need to always use Error Object*/