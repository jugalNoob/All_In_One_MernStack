Reading Files

const fs = require('fs');

// Asynchronous read
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Synchronous read
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}



Writing Files


// Asynchronous write (creates file if doesn't exist, overwrites if it does)
fs.writeFile('file.txt', 'Hello World!', 'utf8', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

// Synchronous write
try {
  fs.writeFileSync('file.txt', 'Hello World!', 'utf8');
  console.log('File written successfully');
} catch (err) {
  console.error(err);
}

// Append to a file
fs.appendFile('file.txt', '\nNew data', 'utf8', (err) => {
  if (err) throw err;
  console.log('Data appended');
});



Updating Files


// Asynchronous write (creates or overwrites file)
fs.writeFile('file.txt', 'Hello World!', 'utf8', (err) => {
  if (err) throw err;
  console.log('Async Write: File written successfully');
});

// Synchronous write
try {
  fs.writeFileSync('file.txt', 'Hello World!', 'utf8');
  console.log('Sync Write: File written successfully');
} catch (err) {
  console.error(err);
}

// Append to file (async)
fs.appendFile('file.txt', '\nExtra data', 'utf8', (err) => {
  if (err) throw err;
  console.log('Async Append: Data appended');
});

// Append to file (sync)
try {
  fs.appendFileSync('file.txt', '\nExtra data', 'utf8');
  console.log('Sync Append: Data appended');
} catch (err) {
  console.error(err);
}




Deleting Files

// Asynchronous delete
fs.unlink('file.txt', (err) => {
  if (err) throw err;
  console.log('Async Delete: File deleted');
});

// Synchronous delete
try {
  fs.unlinkSync('file.txt');
  console.log('Sync Delete: File deleted');
} catch (err) {
  console.error(err);
}



Promises API (recommended for modern code)
Node.js also provides a promise-based version of the fs module:

const fs = require('fs').promises;

async function fileOperations() {
  try {
    // Write
    await fs.writeFile('file.txt', 'Hello');
    
    // Read
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
    
    // Update
    await fs.appendFile('file.txt', '\nWorld');
    
    // Delete
    await fs.unlink('file.txt');
  } catch (err) {
    console.error(err);
  }
}

fileOperations();