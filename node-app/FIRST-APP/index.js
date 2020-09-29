var _ = require('underscore');
/* Node will:
    - require function will first assume that this is a core module
    - then it will assume it is a file or folder
    - And lastly, it will assume it is a module within Node modules folder
    - IN order to reference file or folder, we have to use ./
*/

const result = _.contains([1, 2, 3], 2);
console.log(result);

