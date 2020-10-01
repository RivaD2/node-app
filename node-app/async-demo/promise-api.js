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


    /*PARALLEL PROMISES:
        - running async functions in parallel and then when
        they all complete, I want to do something after
        - for example, I may call several API's, and when
        result of all async operations are ready, THEN I want
        to return something to the client
*/

//excluded reject because I only want to resolve
//let's say this one is for Facebook API
const promiseForApi1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

//let's say I am calling the Instagram API here...
const promiseForApi2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        //set a different value
        resolve(2);
    },2000);
});

/*
    - Now I want to kick-off both of the above async operations
    - When they BOTH com[plete, I want to do something after.
    - Promses.all() is a method that is available on Promise class instead of Promise object
    - I give it an array of Promises (the ones above)
    - This method will return a new promise that will be resolved when all
      promises in array are resolved
      */
Promise.all([promiseForApi1,promiseForApi2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));
    /*I am still dealing with one thread, but this one thread
        is kicking off multiple async operations almost at the same time.
        I am not waiting on the result of the first async operation.
            -In this example, both async operations are started at same time.
            - When I get result, the result is available as array
            - Each Promise is resolved as a value and result array has two values
            - IF ANY OF OUR PROMISES IS REJECTED, then the final promise
                that is returned from Promise.all() IS CONSIDERED REJECTED
     */

     /*Lets say we want to kick off multiple async operations and do something as
     soon as ONE OF THEM completes.
        - If I don't want to wait for all of them to complete,
        then I can use Promise.race().
        - As soon as one promise is fulfilled from Promise.race()
             then promise that is returned will be fulfilled
             */