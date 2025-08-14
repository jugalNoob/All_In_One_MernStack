const net = require('net');
const client = new net.Socket();

const smtpHost = 'smtp.example.com';  // e.g. smtp.gmail.com
const smtpPort = 587;

const username = 'your_email@example.com';
const password = 'your_app_password';

const to = 'receiver@example.com';
const subject = 'Test Email via RAW SMTP';
const message = 'This is a raw SMTP email sent from Node.js';

function encodeBase64(str) {
  return Buffer.from(str).toString('base64');
}

client.connect(smtpPort, smtpHost, () => {
  console.log('Connected to SMTP server');
});

client.on('data', (data) => {
  const response = data.toString();
  console.log('<<<', response);

  if (response.startsWith('220')) {
    client.write(`EHLO localhost\r\n`);
  }

  else if (response.includes('250-')) {
    client.write(`AUTH LOGIN\r\n`);
  }

  else if (response.includes('334') && response.includes('VXNlcm5hbWU6')) {
    client.write(`${encodeBase64(username)}\r\n`);
  }

  else if (response.includes('334') && response.includes('UGFzc3dvcmQ6')) {
    client.write(`${encodeBase64(password)}\r\n`);
  }

  else if (response.startsWith('235')) {
    client.write(`MAIL FROM:<${username}>\r\n`);
  }

  else if (response.startsWith('250') && response.includes('MAIL')) {
    client.write(`RCPT TO:<${to}>\r\n`);
  }

  else if (response.startsWith('250') && response.includes('RCPT')) {
    client.write(`DATA\r\n`);
  }

  else if (response.startsWith('354')) {
    const emailData =
      `From: <${username}>\r\n` +
      `To: <${to}>\r\n` +
      `Subject: ${subject}\r\n\r\n` +
      `${message}\r\n.\r\n`;
    client.write(emailData);
  }

  else if (response.startsWith('250') && response.includes('queued')) {
    client.write(`QUIT\r\n`);
    client.end();
  }
});

client.on('end', () => {
  console.log('Disconnected from SMTP server');
});

client.on('error', (err) => {
  console.error('Error:', err);
});
