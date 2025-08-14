🌐 TCP-Based Projects
1. Web Server (HTTP/HTTPS)
📌 Real-World Example: Apache/Nginx serving websites
🔧 Project: Build a simple HTTP server in Python (socket or Flask) and serve a webpage.

python
# Python HTTP Server (TCP port 80)
from socket import *
server_socket = socket(AF_INET, SOCK_STREAM)
server_socket.bind(('0.0.0.0', 80))
server_socket.listen(1)
print("Server running...")
while True:
    conn, addr = server_socket.accept()
    request = conn.recv(1024).decode()
    response = "HTTP/1.1 200 OK\n\n<h1>Hello, TCP!</h1>"
    conn.send(response.encode())
    conn.close()
2. Email Client (SMTP)
📌 Real-World Example: Gmail sending emails via SMTP
🔧 Project: Use Python’s smtplib to send an email.

python
import smtplib
sender = "you@gmail.com"
receiver = "target@example.com"
message = "Subject: Hello TCP!\n\nThis is a test email."
with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(sender, "your_password")
    server.sendmail(sender, receiver, message)
3. SSH File Transfer (SFTP/SCP)
📌 Real-World Example: Remote server file management
🔧 Project: Use paramiko (Python SSH library) to transfer files.

python
import paramiko
ssh = paramiko.SSHClient()
ssh.connect("example.com", username="user", password="pass")
sftp = ssh.open_sftp()
sftp.put("local_file.txt", "remote_file.txt")  # Upload
sftp.close()
⚡ UDP-Based Projects
1. Live Video Streaming (WebRTC/UDP)
📌 Real-World Example: Zoom/Google Meet
🔧 Project: Use Python + OpenCV to stream webcam over UDP.

python
# Sender (Webcam → UDP)
import cv2, socket
cap = cv2.VideoCapture(0)
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
while True:
    ret, frame = cap.read()
    _, img_encoded = cv2.imencode(".jpg", frame)
    sock.sendto(img_encoded.tobytes(), ("127.0.0.1", 5000))  # Send to receiver
2. DNS Query Tool (UDP)
📌 Real-World Example: dig or nslookup
🔧 Project: Build a mini DNS resolver in Python.

python
import socket
query = b"\xAA\xAA\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x07example\x03com\x00\x00\x01\x00\x01"
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(query, ("8.8.8.8", 53))  # Google DNS
response, _ = sock.recvfrom(1024)
print(response)  # Raw DNS response (decode for IP)
3. IoT Sensor Simulator (UDP)
📌 Real-World Example: Smart home sensors
🔧 Project: Simulate a temperature sensor sending UDP packets.

python
import socket, time, random
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
while True:
    temp = random.randint(20, 30)
    sock.sendto(f"Temp:{temp}C".encode(), ("192.168.1.100", 9999))
    time.sleep(2)  # Send every 2 sec



TCP (Transmission Control Protocol)
✅ Key Traits: Reliable, ordered, connection-oriented, error-checked, flow-controlled
📌 Best for: Applications where data integrity and completeness matter more than speed.

Real-World Examples:
Web Browsing (HTTP/HTTPS)

Ports: 80 (HTTP), 443 (HTTPS)

Why: Ensures full webpage (HTML, images, JS) loads correctly.

Email (SMTP, IMAP, POP3)

Ports:

SMTP (sending): 25, 587, 465

IMAP (receiving): 143, 993

POP3 (receiving): 110, 995

Why: Emails must arrive intact and in order.

SSH (Secure Shell)

Port: 22

Why: Commands & responses must be accurate and secure.

Database Communication (MySQL, PostgreSQL)

Ports: 3306 (MySQL), 5432 (PostgreSQL)

Why: Transactions must be reliable and consistent.

Messaging Apps (WhatsApp Web, Slack)

Uses TCP over WebSockets

Why: Messages must arrive in order and acknowledged.

UDP (User Datagram Protocol)
⚡ Key Traits: Fast, connectionless, no guarantees (no retransmissions, ordering, or congestion control)
📌 Best for: Applications where speed & low latency matter more than perfect delivery.

Real-World Examples:
Video Conferencing (Zoom, Google Meet, WebRTC)

Uses RTP/SRTP over UDP

Why: Dropping a few frames is better than lagging.

DNS (Domain Name System)

Port: 53 (UDP)

Why: Fast lookups; retries if no response.

Online Games (Fortnite, PUBG, Call of Duty)

Why: Real-time movement & actions need low latency (packet loss is tolerable).

IoT Sensors & Telemetry

Protocols: CoAP, MQTT-SN, Custom UDP

Why: Lightweight, low power, frequent small updates.

TFTP (Trivial File Transfer Protocol)

Port: 69

Why: Simpler than FTP (no TCP overhead).

