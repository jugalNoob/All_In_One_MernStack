import React from 'react'

function Rabbit() {

//     |||||||||||||||||||||||Rabbit is a high-performance stream  ..................................
// About Rabbit Cipher:
// Category: Stream cipher
// Use Case: Efficient for environments requiring high-speed encryption, like wireless communications or embedded devices.
// Strength: Known for its speed and efficiency in both software and hardware implementations. Rabbit is not a block cipher, which differentiates it from more common ciphers like AES.


// Encrypting the message using Rabbit Cipher
var encrypted = CryptoJS.Rabbit.encrypt("Message", "Secret Passphrase");
console.log(encrypted.toString());  // Displays the encrypted result

// Decrypting the message using the same passphrase
var decrypted = CryptoJS.Rabbit.decrypt(encrypted, "Secret Passphrase");
console.log(decrypted.toString(CryptoJS.enc.Utf8));  // Displays the decrypted message


// Stream Cipher: It generates a pseudorandom stream of bits (keystream) and then XORs the plaintext with this keystream to produce ciphertext.
// Efficient: Rabbit is known for being fast in both software and hardware, making it suitable for high-performance applications.
// eSTREAM Finalist: Rabbit was one of the four ciphers selected in the eSTREAM project after evaluating several designs for performance and security.




// ----- Second row class  ---------------->>]



// RC4 is a widely-used stream cipher. It's used in popular protocols
//  such as SSL and WEP. Although remarkable for its simplicity and speed, the
//  algorithm's history doesn't inspire confidence in its security.


 var encrypted = CryptoJS.RC4.encrypt("Message", "Secret Passphrase");
 var decrypted = CryptoJS.RC4.decrypt(encrypted, "Secret Passphrase");


 var encrypted = CryptoJS.RC4Drop.encrypt("Message", "Secret Passphrase");
 ​
 var encrypted = CryptoJS.RC4Drop.encrypt("Message", "Secret Passphrase", {
   drop: 3072 / 4
 });
 ​
 var decrypted = CryptoJS.RC4Drop.decrypt(encrypted, "Secret Passphrase", {
   drop: 3072 / 4
 });





  return (
    <div>
      
    </div>
  )
}

export default Rabbit
