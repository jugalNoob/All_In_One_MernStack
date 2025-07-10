import React from 'react'

function Coustm() {

    
//  ||||||||Custom Key and IV |||||||||||||||||||||||||

 var key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");

var iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
​
var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });


import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

const MyComponent = () => {
  useEffect(() => {
    // Properties from the encrypted object
    const encryptedData = {
      key: CryptoJS.enc.Hex.parse("74eb593087a982e2a6f5dded54ecd96d1fd0f3d44a58728cdcd40c55227522223"),
      iv: CryptoJS.enc.Hex.parse("7781157e2629b094f0e3dd48c4d786115"),
      salt: CryptoJS.enc.Hex.parse("7a25f9132ec6a8b34"),
      ciphertext: CryptoJS.enc.Hex.parse("73e54154a15d1beeb509d9e12f1e462a0")
    };
    // Passphrase used during encryption
    const passphrase = "Secret Passphrase";

    // Create an object compatible with decryption
    const decryptionObject = {
      ciphertext: encryptedData.ciphertext,
      key: encryptedData.key,
      iv: encryptedData.iv,
      salt: encryptedData.salt
    };

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(decryptionObject, passphrase).toString(CryptoJS.enc.Utf8);

    console.log('Decrypted Message:', decrypted);
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};



export default Coustm
