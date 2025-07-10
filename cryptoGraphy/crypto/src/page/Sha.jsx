import React from 'react';
import sha256 from 'crypto-js/sha256';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';

function Sha() {
  const message = "hi mom";
  const key = "mySecretKey";

  // SHA256 Hash
  const sha = sha256(message);
  console.log("SHA256:", sha.toString());

  // HMAC-SHA512 with key
  const hmac = HmacSHA512(message, key);
  console.log("HMAC-SHA512 (hex):", hmac.toString());

  console.log(hmac.toString().length)

  // Optional: Base64 encoding of HMAC
  const hmacBase64 = Base64.stringify(hmac);
  console.log("HMAC-SHA512 (Base64):", hmacBase64);



  const messagess = 'Message to hash';

const hashedMessage = sha256(messagess).toString();

console.log('SHA-256 Hash:', hashedMessage);


var sha256 = CryptoJS.algo.sha256.create();
sha256.update("Message Part 1");
sha256.update("Message Part 2");
sha256.update("Message Part 3")

// Finalize the hash after updating with multiple parts
var hash = sha256.finalize();

console.log('SHA-256 Hash (Multiple Updates):', hash.toString());



  return (
    <div>
      <h2>Check the console for SHA256 and HMAC-SHA512 output</h2>
    </div>
  );
}

export default Sha;
