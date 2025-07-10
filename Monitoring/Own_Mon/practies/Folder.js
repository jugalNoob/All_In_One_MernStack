const os = require('os');

// // Get the system's temporary directory
// const tempDir = os.tmpdir();
// console.log('Temporary Directory:', tempDir);

// // Get the current user's home directory
// const homeDir = os.homedir();
// console.log('Home Directory:', homeDir);


const fs = require('fs');
const path = require('path');

// Specify the directory (home directory in this case)
const directoryPath = os.homedir();

// Read the contents of the directory
fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter and list only directories
    const directories = files.filter(file => file.isDirectory()).map(file => file.name);
    console.log('Directories in', directoryPath, ':', directories);
});
