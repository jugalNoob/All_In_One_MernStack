import React from 'react';
import CryptoJS from 'crypto-js';

function Encryption() {
  // Encrypt
  const ciphertext = CryptoJS.AES.encrypt('hi mom', 'secret key 123').toString();

  // Decrypt
  const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  console.log("Encrypted:", ciphertext);
  console.log("Decrypted:", originalText); // 'my message'


  // with object data ---->>

  var data = [{id: 1}, {id: 2}]

// Encrypt
var ciphertexts = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// Decrypt
var bytess  = CryptoJS.AES.decrypt(ciphertexts, 'secret key 123');
var decryptedData = JSON.parse(bytess.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]



// DES is a previously dominant algorithm for encryption, and was published as an
//  official Federal Information Processing Standard (FIPS). DES is now 
// considered to be insecure due to the small key size.

var encrypted = CryptoJS.DES.encrypt("Message", "Secret Passphrase");
​
var decrypted = CryptoJS.DES.decrypt(encrypted, "Secret Passphrase");

var encrypted = CryptoJS.TripleDES.encrypt("Message", "Secret Passphrase");
​
var decrypted = CryptoJS.TripleDES.decrypt(encrypted, "Secret Passphrase");

  return (
    <div>
      <h2>Check console for encryption/decryption output</h2>
    </div>
  );
}

export default Encryption;
