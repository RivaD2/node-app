console.log('Before');





/* - We can chain then to what we get from getUser function
    -the function passed to the .then method, if function
    returns value, then, we will wrap value inside promise
    - if we return a value, then we will have another promise
    - The first .then is the promise that is returned from getRepositories function
    - Then we have another then, this then then returns promise from getCommits*/
getUser(1)
    .then(user => getRespositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    //single error handler that come from any of the above async operations
    .catch(err => console.log('Error', err.message));

    console.log('After');

/* This is an asynchronous function
        - it takes two args: the function, and then a time
        - after 2 seconds, the code will be simulated
        - With this set up, before and after are displayed immediately
            and then we have the setTimeout message
        - When the setTImeout is called, it schedules a task to place
            in the future, 2 seconds after
        - 2 seconds after, it will call the setTiime function we passed as 1st arg
        - it doesn't wait, it block, it schedules task and then control is returned
        - that is why we we see before, after, then the message
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


/* 3 patterns for dealing with asynchronous code:
            callbacks, promises, async/await*/
//using callback
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

//callback hell or XMAS TREE PROBLEM
    //as we create more functions, they require callbacks and this
    //structure ends up being nested, or tree like and it hard to read
    //The technique we used, is to replace anonymous function with named function
    //this flattens the structure of code
