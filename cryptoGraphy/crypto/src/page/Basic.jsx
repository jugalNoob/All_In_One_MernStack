

    // |||||||||||||||||||Base in CryptoGraphy |||||||||||||||||||||||||||||
import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';

    // Base64 Encoding/Decoding
    const base64String = "SGVsbG8sIFdvcmxkIQ==";
    const base64Words = CryptoJS.enc.Base64.parse(base64String);
    const base64Decoded = CryptoJS.enc.Base64.stringify(base64Words);

    console.log('Base64 Encoded:', base64String);
    console.log('Base64 Decoded:', base64Decoded);

    // Latin1 Encoding/Decoding
    const latin1String = "Hello, World!";
    const latin1Words = CryptoJS.enc.Latin1.parse(latin1String);
    const latin1Encoded = CryptoJS.enc.Latin1.stringify(latin1Words);

    console.log('Latin1 Encoded:', latin1String);
    console.log('Latin1 Decoded:', latin1Encoded);

    // Hex Encoding/Decoding
    const hexString = "48656c6c6f2c20576f726c6421";
    const hexWords = CryptoJS.enc.Hex.parse(hexString);
    const hexEncoded = CryptoJS.enc.Hex.stringify(hexWords);

    console.log('Hex Encoded:', hexString);
    console.log('Hex Decoded:', hexEncoded);

    // UTF-8 Encoding/Decoding
    const utf8String = "𔭢";
    const utf8Words = CryptoJS.enc.Utf8.parse(utf8String);
    const utf8Encoded = CryptoJS.enc.Utf8.stringify(utf8Words);

    console.log('UTF-8 Encoded:', utf8String);
    console.log('UTF-8 Decoded:', utf8Encoded);

    // UTF-16 Encoding/Decoding
    const utf16String = "Hello, World!";
    const utf16Words = CryptoJS.enc.Utf16.parse(utf16String);
    const utf16Encoded = CryptoJS.enc.Utf16.stringify(utf16Words);

    console.log('UTF-16 Encoded:', utf16String);
    console.log('UTF-16 Decoded:', utf16Encoded);

    // UTF-16LE Encoding/Decoding
    const utf16LEString = "Hello, World!";
    const utf16LEWords = CryptoJS.enc.Utf16LE.parse(utf16LEString);
    const utf16LEEncoded = CryptoJS.enc.Utf16LE.stringify(utf16LEWords);

    console.log('UTF-16LE Encoded:', utf16LEString);
    console.log('UTF-16LE Decoded:', utf16LEEncoded);


    var words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
​
var base64 = CryptoJS.enc.Base64.stringify(words);
​
var words = CryptoJS.enc.Latin1.parse("Hello, World!");
​
var latin1 = CryptoJS.enc.Latin1.stringify(words);
​
var words = CryptoJS.enc.Hex.parse("48656c6c6f2c20576f726c6421");
​
var hex = CryptoJS.enc.Hex.stringify(words);
​
var words = CryptoJS.enc.Utf8.parse("𔭢");
​
var utf8 = CryptoJS.enc.Utf8.stringify(words);
​
var words = CryptoJS.enc.Utf16.parse("Hello, World!");
​
var utf16 = CryptoJS.enc.Utf16.stringify(words);
​
var words = CryptoJS.enc.Utf16LE.parse("Hello, World!");
​
var utf16 = CryptoJS.enc.Utf16LE.stringify(words);

  return (
    <div>
      
    </div>
  )


export default Basic
