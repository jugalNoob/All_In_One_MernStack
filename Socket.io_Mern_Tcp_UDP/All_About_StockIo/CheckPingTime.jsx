1. Server Side

You already have your io.on('connection', ...). Add a ping listener:



io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Latency check
  socket.on('pingCheck', (sentTime) => {
    // Respond back with the same timestamp
    socket.emit('pongCheck', sentTime);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});




Use the timestamp to calculate round-trip time:

<script>
  const socket = io('http://localhost:3000');

  // Send ping every 2 seconds
  setInterval(() => {
    const sentTime = Date.now();
    socket.emit('pingCheck', sentTime);
  }, 2000);

  // Receive pong and calculate latency
  socket.on('pongCheck', (sentTime) => {
    const latency = Date.now() - sentTime;
    console.log('Latency: ' + latency + ' ms');
  });
</script>



