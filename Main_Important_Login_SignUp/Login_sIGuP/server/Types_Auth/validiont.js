1::Otp 
2::Seccion 
3::Jwt 
4::Password Hash 
5::0auth -->GitHub



🛡️ 3. Advanced Security Concepts

| Topic                            | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| **Refresh Token Rotation**       | Avoids reuse of old refresh tokens.                             |
| **Token Blacklisting**           | Blacklist tokens (esp. refresh tokens) on logout or compromise. |
| **Session Hijack Detection**     | Detect IP/Device/User-Agent mismatch and kill session.          |
| **Rate Limiting per Role**       | Example: admins 100 req/min, guests 10 req/min.                 |
| **IP Whitelisting / Geofencing** | Allow/block users based on IP or country.                       |
| **JWT Encryption (JWE)**         | Encrypt JWT payload instead of just signing (JWS).              |
| **OAuth Scopes & Claims**        | Fine-grained control over access rights via token claims.       |
| **Certificate Pinning**          | Ensures only trusted certificates used in HTTPS.                |
| **PKCE (OAuth for Mobile)**      | Secure mobile OAuth login (prevents interception).              |


Authentication is the process of verifying the identity of a user, system, or application. There are several types of authentication methods, and they can be categorized based on the type of information used for verification:

🔐 Main Types of Authentication
1. Password-Based Authentication
Most common method.

Requires a username and password.

Easy to implement, but vulnerable to:

Brute force attacks

Phishing

Credential stuffing

2. Two-Factor Authentication (2FA) / Multi-Factor Authentication (MFA)
Combines two or more of the following:

Something you know (e.g., password)

Something you have (e.g., OTP via phone, security token)

Something you are (e.g., fingerprint, facial recognition)

Increases security by adding additional layers.

3. Biometric Authentication
Uses physical characteristics:

Fingerprint

Facial recognition

Retina/iris scan

Voice recognition

High security and convenience but raises privacy concerns.

4. Token-Based Authentication
Generates a token after login, which is used for subsequent requests.

Examples:

JWT (JSON Web Tokens)

OAuth access tokens

Common in APIs and SPAs (Single Page Applications).

5. OAuth (Open Authorization)
Delegated authorization protocol.

Allows third-party services (like Google, Facebook) to authenticate users without exposing passwords.

Often used with OpenID Connect for full authentication.

6. Certificate-Based Authentication
Uses digital certificates (X.509) issued by a Certificate Authority (CA).

Common in SSL/TLS for websites or client-server authentication.

7. Single Sign-On (SSO)
One-time login provides access to multiple systems.

Used in enterprise and cloud environments.

Common protocols: SAML, OAuth2 + OIDC, Kerberos.

8. API Key Authentication
A unique key is passed in requests for authentication.

Simple but less secure if not managed properly.

9. Session-Based Authentication
Server creates a session and stores it (often in memory or Redis).

A session ID is returned to the client (usually stored in cookies).

Traditional method in web apps.

10. Device-Based Authentication
Trust specific devices via unique device ID or fingerprint.

Often used in conjunction with MFA.


| Method            | Security Level | Common Use Cases                   |
| ----------------- | -------------- | ---------------------------------- |
| Password-Based    | Low            | Basic login forms                  |
| 2FA / MFA         | High           | Banking, Email, SaaS               |
| Biometric         | High           | Mobile apps, Security systems      |
| Token-Based (JWT) | Medium–High    | REST APIs, SPAs                    |
| OAuth / OIDC      | High           | Login via Google, GitHub, etc.     |
| Certificate-Based | Very High      | Secure client-server communication |
| SSO               | High           | Enterprise apps, cloud platforms   |
| API Key           | Medium         | Microservices, API access          |
| Session-Based     | Medium         | Traditional web applications       |
