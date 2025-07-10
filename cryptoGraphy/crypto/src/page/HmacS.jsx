import React from 'react'
import CryptoJS from 'crypto-js';

function HmacS() {

    const message = 'Message';
    const key = 'Key';
    const hmac = CryptoJS.HmacSHA1(message, key);
    const hmacString = hmac.toString(CryptoJS.enc.Base64);
    console.log('HMAC-SHA1:', hmacString);
    
    var hash = CryptoJS.HmacMD5("Message", "Secret Passphrase");
    var hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
    var hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
    var hash = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
     
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, "Secret Passphrase");
hmac.update("Message Part 1");
hmac.update("Message Part 2");
hmac.update("Message Part 3");
​
var hash = hmac.finalize();

  return (
    <div>
      
    </div>
  )
}

export default HmacS
