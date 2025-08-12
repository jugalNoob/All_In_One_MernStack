/// Simple Rate Limit start ::::::::::::::::

const express = require('express');

const app = express();

const port = 9000;

let one = 0; // Declare outside to persist across requests
let resetInProgress = false; // To avoid multiple resets at the same time

app.get("/", (req, res) => {
    if (one >= 5) {
        if (!resetInProgress) {
            resetInProgress = true;
            console.log("Reset will occur in 5 seconds.");
            setTimeout(() => {
                one = 0;
                resetInProgress = false;
                console.log("Counter reset.");
            }, 5000); // 5-second delay
        }
        res.send(`Limit reached: ${one}`);
        console.log(`Limit reached: ${one}`);
    } else {
        res.send(`Hello World ${one}`);
        console.log(one);
        one++;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
