var Promise = require('bluebird');
var fs = require('fs');

/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */

var utils = require('../bare_minimum/promiseConstructor')

var combineFirstLineOfManyFiles = function (filePaths, writePath) {
  //for each thing in filePaths
  //create a promise that gets the first line of that file
  //maybe put the promise into an array?

  //put that array of promises into Promise.all, so that once they are all complete, we can run 
  //fs writefile 
  var promises = [];
  for (let path of filePaths) {
    promises.push(new Promise((resolve, reject) => {
      utils.pluckFirstLineFromFileAsync(path)
        .then((line) => {
          resolve(line)
        })
    }))
  }
  return Promise.all(promises).then(function (values) {
      fs.writeFile(writePath, values.join('\n'));
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};