// udpServer.js
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`✅ UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
  console.log(`📩 Received: ${msg} from ${rinfo.address}:${rinfo.port}`);

  // Echo the message back
  server.send(`You said: ${msg}`, rinfo.port, rinfo.address, (err) => {
    if (err) console.error('❌ Error sending response:', err);
  });
});

server.bind(41234); // Use any available port



//✅ UDP server listening on 0.0.0.0:41234
//📩 Received: Hello UDP Server! from 127.0.0.1:PORT
