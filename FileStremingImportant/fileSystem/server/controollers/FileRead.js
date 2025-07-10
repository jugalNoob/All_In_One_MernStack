// let messages="jhjdcskhjhcfsiyhfsciufvsyuifcsyugfsvyu"
// var CryptoJS = require("crypto-js");
// const fs = require('fs')
// const path = require('path');


// exports.userRead = async (req, res) => {
//     const { fileName } = req.body;

//     if (!fileName) {
//         return res.status(400).json({ error: 'File name is required!' });
//     }

//     try {
//         // Correctly build the file path to include the file name
//         const filePath = path.join(__dirname, 'filesystem', fileName);

//         // Check if the file exists
//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({ error: `File '${fileName}' not found.` });
//         }

//         // Read the file content asynchronously
//         const data = await fs.promises.readFile(filePath, 'utf8');

//                 const bytes = CryptoJS.AES.decrypt(data, messages);
//                         const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//                         console.log("Decrypted:", decrypted);

//         res.status(200).json({ content:  decrypted , filePath });
//     } catch (err) {
//         console.error('Error reading file:', err);
//         res.status(500).json({ error: 'Failed to read the file.' });
//     }
// };

const path = require('path');
const connectionQueue = require('../connection/connect'); // adjust path if needed

exports.userRead = async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required!' });
  }

  try {
    const filePath = path.join(__dirname, 'filesystem', fileName);

    // Enqueue a BullMQ job to read & decrypt the file asynchronously
    const job = await connectionQueue.add('readFileAndDecrypt', {
      fileName,
      filePath,
    });

    res.status(200).json({
      message: `Job queued to read and decrypt file '${fileName}'.`,
      jobId: job.id,
    });
  } catch (err) {
    console.error('Error queuing read job:', err);
    res.status(500).json({ error: 'Failed to queue file read job: ' + err.message });
  }
};
