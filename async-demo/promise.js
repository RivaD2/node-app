/*
- New Promises take an arg that is a function with two params
- The two params are resolve and reject
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


