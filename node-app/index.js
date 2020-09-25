var _ = require('underscore');
/* Node will:
    - require function will first assume that this is a core module
    - then it will assume it is a file or folder
    - And lastly, it will assume it is a module within Node modules folder
    - IN order to reference file or folder, we have to use ./
*/

const result = _.contains([1, 2, 3], 2);
console.log(result);

/*Semantic versioning
    - major version, minor version, patch version
    - EX; "mongoose":"^4.13.6" or 4.x or Tilde ~4.13.6
    - The caret tells NPM that we are interested in
    - ANY version of mongoose as long as the major version is 4. If
      there is a newer, minor or patch version, we want that as well.
*/

// npm list --depth=0 (shows me all my dependencies)
//npm view mongoose dependencies (this wills how us list of dependencies in packages)
//nom list mongoose versions (this will show me a list of ALL the versions)
//to set a version npm i mongoose@2.4.2(json will update)

/*Updating local packages:
    - newer versions of dependencies will come out as we work on projects
    - (in terminal) run npm outdated
    - NPM looks at versions of dependencies and compares them to what is there
    in the NPM registry
    - (in terminal) npm update (this only works for updating minor and patch releases)
    - (in terminal) sudo npm install -g npm-check-updates
    -(in terminal) npm check updates (this will show us all outdated packages and their newest versions)
    - (in terminal)run ncu (aka npm check updates) and run ncu -u to update package json
    - once everything is updated, I still have to run npm i
*/

/* Dev dependencies:
    - Sometimes there are dependencies only used in development stages
    - These are dev dependencies and should not go into production environment
    - These are still listed in node modules and package.json
    */

/* uninstalling a package:
`   - npm uninstall or npm un mongoose (for example)
    */
/* working with Global packages:
    - npm is a global package as we can run it in any folder
    - angular cli is also global
    - to install package globally, use npm i -g npm (this will update npm)
    - I can run npm -g outdated to see all outdated global packages
    */

/* How to publish my own packages to NOM registry:
    - first created new folder mkdir lion-lib
    - cd lion-lib/
    - npm init --yes
    - open folder since we have a package.json now
    - open new file index.js or whatever file will be the entry point
    - module.exports.add = function(a, b) {
        return a + b}
    };

    - npm login (to login to account)
    - enter username
    - enter password
    - enter email
    - then to publish package, run npm publish
    - go into package.json, use a unique name
    - in terminal, run npm publish
    - Now I can use this package.json in another folder
*/
/* how to publish newer versions of our own package:
    - module.exports.multiply = function(a, b) {
        return a + b}
    };
    - you can't publish over another version
    - in package.json we can manually update version //#endregion
    - we can also run npm version major, minor or patch
    - Ex: nopm version minor
    - npm publish
    */
