console.log('Before');
getUser(1, getRespositories);
console.log('After');


function getRespositories(user) {
    getRespositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}


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
function getUser (id, callback) {
    setTimeout(() => {
        console.log('Reading user from a database...');
        callback({id:id, gitHubUsername: 'Riva'});
    }, 2000);

};
/* 3 patterns for dealing with asynchronous code:
            callbacks, promises, async/await*/
//using callback
function getRespositories(username, callback) {
    setTimeout(() => {
        console.log('calling Github API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);

}
//callback hell or XMAS TREE PROBLEM
    //as we create more functions, they require callbacks and this
    //structure ends up being nested, or tree like and it hard to read
    //The technique we used, is to replace anonymous function with named function
    //this flattens the structure of code