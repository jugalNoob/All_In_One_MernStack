
📬 What is SMTP?
SMTP (Simple Mail Transfer Protocol) is the standard protocol used to send emails from a client (like your Node.js app or Gmail) to a mail server and between mail servers.

📤 SMTP is used for sending

📥 POP3 / IMAP are used for receiving


🧠 Core Features of SMTP


| Feature        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **Protocol**   | Application layer protocol                                 |
| **Transport**  | Uses **TCP** (reliable, ordered delivery)                  |
| **Port**       | 25 (default), 587 (TLS), 465 (SSL)                         |
| **Direction**  | Outgoing emails only (client ➝ server / server ➝ server)   |
| **Text-Based** | Communicates using ASCII text commands (e.g., `MAIL FROM`) |
| **Stateful**   | Requires a session to be established                       |




🔁 SMTP Communication Flow (Client → Server)
Typical Sequence:
vbnet
Copy
Edit
Client:    CONNECT to smtp.example.com on port 587
Server:    220 smtp.example.com ESMTP Postfix
Client:    EHLO client.example.com
Server:    250-smtp.example.com Hello ...
Client:    AUTH LOGIN
Server:    334 VXNlcm5hbWU6         <- "Username:"
Client:    base64(username)
Server:    334 UGFzc3dvcmQ6         <- "Password:"
Client:    base64(password)
Server:    235 2.7.0 Authentication successful
Client:    MAIL FROM:<you@example.com>
Server:    250 OK
Client:    RCPT TO:<friend@example.com>
Server:    250 OK
Client:    DATA
Server:    354 End data with <CR><LF>.<CR><LF>
Client:    [headers + message body]
Client:    .
Server:    250 Message queued
Client:    QUIT



📄 SMTP Commands Cheat Sheet


| Command      | Description                         |
| ------------ | ----------------------------------- |
| `HELO`       | Start session with hostname         |
| `EHLO`       | Extended Hello (modern)             |
| `AUTH LOGIN` | Authenticate client using base64    |
| `MAIL FROM:` | Sender email address                |
| `RCPT TO:`   | Recipient email address             |
| `DATA`       | Start of the email body             |
| `.`          | End of message body                 |
| `QUIT`       | Close connection                    |
| `STARTTLS`   | Upgrade to encrypted TLS (optional) |



📦 SMTP Email Structure (DATA block)
text
Copy
Edit
From: Jugal <you@example.com>
To: Friend <friend@example.com>
Subject: Test Email

Hello friend,
This is a raw SMTP email sent from Node.js!




🛠 Real-World Use Cases of SMTP



| System              | Role of SMTP                                                   |
| ------------------- | -------------------------------------------------------------- |
| Gmail/Outlook/Yahoo | Sends emails from web/mail client                              |
| Node.js apps        | Sends transactional emails                                     |
| Marketing tools     | Sends newsletters (Mailchimp, SendGrid)                        |
| Backend systems     | Alerting/logging via SMTP (e.g., health checks)                |
| Email relays        | Mail servers (Postfix, Exim, Sendmail) use SMTP to communicate |




📊 SMTP vs POP3 vs IMAP


| Feature      | SMTP          | POP3             | IMAP                |
| ------------ | ------------- | ---------------- | ------------------- |
| Purpose      | Send mail     | Download mail    | Sync mail           |
| Direction    | Outgoing only | Incoming         | Incoming            |
| Protocol     | Push          | Pull             | Sync (with folders) |
| Port         | 25/465/587    | 110/995          | 143/993             |
| Deletes Mail | No            | Yes (by default) | No                  |




📜 Example: Sending SMTP Email in Node.js (Raw, No Nodemailer)
js
Copy
Edit
const net = require('net');
const client = net.createConnection(587, 'smtp.example.com');

client.on('connect', () => {
  client.write('EHLO localhost\r\n');
  client.write('AUTH LOGIN\r\n');
  client.write(Buffer.from('your_email@example.com').toString('base64') + '\r\n');
  client.write(Buffer.from('your_password').toString('base64') + '\r\n');
  client.write('MAIL FROM:<your_email@example.com>\r\n');
  client.write('RCPT TO:<receiver@example.com>\r\n');
  client.write('DATA\r\n');
  client.write('Subject: Hello from raw SMTP!\r\n\r\nThis is a test email.\r\n.\r\n');
  client.write('QUIT\r\n');
});


🔐 SMTP Security Enhancements
SPF (Sender Policy Framework)
➤ Prevents spoofing of your domain by specifying valid sender IPs.

DKIM (DomainKeys Identified Mail)
➤ Cryptographically signs emails to prove authenticity.

DMARC (Domain-based Message Authentication)
➤ Policy layer that tells other mail servers how to handle failed SPF/DKIM.




💡 SMTP Server Software



| Software               | Description                         |
| ---------------------- | ----------------------------------- |
| **Postfix**            | Most widely used, secure, fast      |
| **Sendmail**           | Legacy but powerful                 |
| **Exim**               | Default on many Linux distributions |
| **Microsoft Exchange** | Enterprise email suite              |




☁️ Cloud SMTP Providers


| Provider   | Free Tier | Notes                                  |
| ---------- | --------- | -------------------------------------- |
| SendGrid   | ✅         | Easy Node.js integration, API+SMTP     |
| Amazon SES | ✅         | Powerful and cheap, needs config       |
| Mailgun    | ✅         | Simple API, reliable                   |
| Gmail SMTP | ✅         | Use with app password (limit: 500/day) |
| Zoho Mail  | ✅         | Free domain email, SMTP included       |
