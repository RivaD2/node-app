
/*  - A Promise is an object that holds eventual result of async operation
    - Initially it is in pending state
    - Then it kicks of async operation that complete successfully or failed
    - ANYWHERE I HAVE AN ASYNC FUNCTION THAT TAKES A CALLBACK,
        I SHOULD MODIFY FUNCTION TO RETURN A PROMISE
    - New Promises take an arg that is a function with two params
    - The two params are resolve and reject
    - Then inside the async work will kick off
    - This work may be calling web service, accessing a database, setting Timeer etc.
    - Eventually when aync work completes, we should have a value or an error
    - If there is a value, we need to return it to consumer of Promise
    - The promise object promises us that it will give us a result of an async operation
    - The way we send this to the consumer is using resolve and reject
    - Resolve and reject are functions and we can pass value to them when calling them
    - For example, resolve(1);
    - If error, then reject(new Error('message'))
    */
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        //callback function will be called after 2 seconds and produce value of 1
        //resolve(1); //resolved is fulfilled

        //this returns error to consumer
        reject(new Error('message'));
    }, 2000);

});
p
//call then to get the result
.then(result => console.log('result', result))
//call catch to get error
.catch(err => console.log('Error', err.message));
