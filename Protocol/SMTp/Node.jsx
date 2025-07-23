const net = require('net');
const CRLF = '\r\n';

// Config (replace with your SMTP server)
const SMTP_SERVER = 'smtp.gmail.com';
const SMTP_PORT = 587;
const USERNAME = 'your@gmail.com';
const PASSWORD = 'your-app-password'; // Use an "App Password" for Gmail
const FROM = 'your@gmail.com';
const TO = 'recipient@example.com';

// Create TCP socket
const socket = net.createConnection(SMTP_PORT, SMTP_SERVER, () => {
  console.log('Connected to SMTP server');
});

// Handle responses
socket.on('data', (data) => {
  const response = data.toString();
  console.log('SERVER:', response.trim());

  if (response.startsWith('220')) {
    // EHLO command
    socket.write(`EHLO ${SMTP_SERVER}${CRLF}`);
  } else if (response.includes('250 AUTH LOGIN')) {
    // Start authentication
    socket.write(`AUTH LOGIN${CRLF}`);
  } else if (response.includes('334 VXNlcm5hbWU6')) {
    // Send base64-encoded username
    socket.write(Buffer.from(USERNAME).toString('base64') + CRLF);
  } else if (response.includes('334 UGFzc3dvcmQ6')) {
    // Send base64-encoded password
    socket.write(Buffer.from(PASSWORD).toString('base64') + CRLF);
  } else if (response.includes('235 2.7.0 Accepted')) {
    // Send email
    socket.write(`MAIL FROM:<${FROM}>${CRLF}`);
  } else if (response.includes('250 2.1.0 OK')) {
    socket.write(`RCPT TO:<${TO}>${CRLF}`);
  } else if (response.includes('250 2.1.5 OK')) {
    socket.write(`DATA${CRLF}`);
  } else if (response.includes('354 Go ahead')) {
    // Email headers + body
    socket.write([
      `From: ${FROM}`,
      `To: ${TO}`,
      `Subject: Hello from RAW SMTP!`,
      `Content-Type: text/plain; charset=utf-8`,
      '',
      'This email was sent using raw SMTP in Node.js!',
      '.', // End with single dot
      ''
    ].join(CRLF) + CRLF);
  } else if (response.includes('250 2.0.0 OK')) {
    console.log('Email sent successfully!');
    socket.write(`QUIT${CRLF}`);
  }
});

socket.on('end', () => {
  console.log('Disconnected from SMTP server');
});

// Error handling
socket.on('error', (err) => {
  console.error('SMTP Error:', err);
});