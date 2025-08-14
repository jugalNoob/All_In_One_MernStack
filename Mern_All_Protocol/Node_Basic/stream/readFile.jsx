const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

// Create a readable stream
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('📦 Received chunk:', chunk);
});

readStream.on('end', () => {
  console.log('✅ Finished reading file.');
});

readStream.on('error', (err) => {
  console.error('❌ Error reading file:', err);
});




// fs.createReadStream() → reads file in chunks (default: 64 KB per chunk)

// data event → triggers every time a chunk is read

// end event → triggers when file is fully read

// error event → handles any issues (like file not found)

