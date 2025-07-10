const os = require('os');
const fs = require('fs');
const path = require('path');

// Specify the directory (home directory in this case)
const directoryPath = os.homedir();

// Function to read the contents of the home directory
const getDirectoriesInHome = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        reject('Error reading directory:', err);
        return;
      }

      // Filter and list only directories
      const directories = files.filter(file => file.isDirectory()).map(file => file.name);
      resolve(directories);
    });
  });
};

// Export the function for use in your controller
module.exports = {
  getDirectoriesInHome,
  directoryPath
};

// Example usage of getDirectoriesInHome
getDirectoriesInHome()
  .then(directories => {
    // console.log('Directories in home:', directories);
  })
  .catch(err => {
    console.error(err);
  });


// const tempDir = os.tmpdir();
// console.log('Temporary Directory:', tempDir);

// // Get the current user's home directory
// const homeDir = os.homedir();
// console.log('Home Directory:', homeDir);