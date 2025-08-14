// udpClient.js
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello UDP Server!');
client.send(message, 41234, 'localhost', (err) => {
  if (err) console.error('❌ Error sending message:', err);
  else console.log('📨 Message sent to server');
});

// Listen for server response
client.on('message', (msg, rinfo) => {
  console.log(`✅ Server says: ${msg}`);
  client.close();
});


//📨 Message sent to server
// /✅ Server says: You said: Hello UDP Server!
