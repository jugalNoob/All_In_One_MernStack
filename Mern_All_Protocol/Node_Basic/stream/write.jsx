const fs = require('fs');

// Create a writable stream
const writeStream = fs.createWriteStream('output.txt', 'utf8');

// Write data in chunks
writeStream.write('Hello ');
writeStream.write('World!');
writeStream.write('\nThis is written using a writable stream.');

// End the stream
writeStream.end();

// Event listeners
writeStream.on('finish', () => {
  console.log('File writing completed.');
});

writeStream.on('error', (err) => {
  console.error('Error writing file:', err);
});//#endregion



// 🔹 How It Works:
// fs.createWriteStream() → Creates a writable stream to a file.

// .write() → Writes chunks of data.

// .end() → Signals that no more data will be written.

// finish event → Triggered when writing is complete.

// error event → Triggered if writing fails.



📌 Real-world use case:
You’d use this when:

Writing logs continuously to a file.

Saving large upload data to disk in chunks instead of keeping it all in memory.