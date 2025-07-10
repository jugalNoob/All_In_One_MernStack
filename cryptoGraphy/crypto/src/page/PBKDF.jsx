import React from 'react'
import CryptoJS from 'crypto-js';
function PBKDF() {

    // Generate a random salt (16 bytes = 128 bits)
var salt = CryptoJS.lib.WordArray.random(128 / 8);

// 128-bit key (16 bytes)
var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
    keySize: 128 / 32
  });
  
  // 256-bit key (32 bytes)
  var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
    keySize: 256 / 32
  });
  
  // 512-bit key (64 bytes)
  var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
    keySize: 512 / 32
  });

  
//   🛡️ Stronger key with more iterations (default is 1,000 in many libraries, but CryptoJS uses 1 by default unless specified):
console.log("Salt: " + salt.toString());
console.log("128-bit key: " + key128Bits.toString());
console.log("256-bit key: " + key256Bits.toString());
console.log("512-bit key: " + key512Bits.toString());
console.log("512-bit key (1000 iterations): " + key512Bits1000Iterations.toString());



  return (
    <div>

You're using PBKDF2 (Password-Based Key Derivation Function 2) from the CryptoJS library to derive cryptographic keys from a password, which is a great practice when you need secure encryption keys but only have a user-entered password.

Here's a breakdown of what your code is doing:



🔐 Security Notes
Always use a random salt, which you are doing 👍

Increase the number of iterations to slow down brute-force attacks (e.g., 100,000 or more is recommended in modern systems)

Store the salt and iteration count with the encrypted data, so they can be used for decryption later

Don’t reuse salts for different passwords
      
    </div>
  )
}

export default PBKDF
