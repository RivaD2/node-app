console.log('Before');

/*ASYNC AND AWAIT APPROACH:
    -Anytime I am calling a function that returns a promise, I can await the result and get
        result by calling async function
    - In this example, I need to get the result and store in user object
    - Since I have user obj I can call getRepositories and get repos for user
    - With async functions, instead of .then and .catch, I wrap the code
        in a try-catch block
*/

async function displayCommits() {
    try {
        const user = await getUser(1);
        /*call gitRepositories and get respos for user and this function returns promise
        so I await result and get repos and store to const*/
        const repos = await getRespositories(user.gitHubUsername)
        /*I can call gitCommits, pass first repo and the function will return promise, so I can await it,
        and store commits in const*/
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
displayCommits();
console.log('After');


//PROMISE-BASED APPROACH:

/*
    - We can chain then to what we get from getUser function
    -the function passed to the .then method, if function
    returns value, then, we will wrap value inside promise
    - if we return a value, then we will have another promise
    - The first .then is the promise that is returned from getRepositories function
    - Then we have another then, this then then returns promise from getCommits
*/
    getUser(1)
    .then(user => getRespositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    //single error handler that come from any of the above async operations
    .catch(err => console.log('Error', err.message));


/* An Asynchronous function:
     - It takes two args: the function, and then a time
     - After 2 seconds, the code will be simulated
     - With this set up, before and after are displayed immediately
            and then we have the setTimeout message
     - When the setTImeout is called, it schedules a task to place
            in the future, 2 seconds after
     - 2 seconds after, it will call the setTiime function we passed as 1st arg
     - It doesn't wait, it block, it schedules task and then control is returned
     - That is why we we see before, after, then the message
     - Asynchronous does not mean multithread
     - We have a single thread here.
 */

function getUser (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from a database...');
            resolve({id:id, gitHubUsername: 'Riva'});
        }, 2000);
    });
};


function getRespositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling Github API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling Github API...');
            resolve(['commit']);
        }, 2000);
    });
}


