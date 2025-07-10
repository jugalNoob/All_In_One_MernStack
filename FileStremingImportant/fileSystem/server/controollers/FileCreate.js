const CryptoJS = require("crypto-js");
const fs = require('fs');
const path = require('path');
const connectionQueue = require('../connection/connect'); // adjust path to actual file
let messages = "jhjdcskhjhcfsiyhfsciufvsyuifcsyugfsvyu";

exports.userCreate = async (req, res) => {
    const { fileName, content } = req.body;

    if (!fileName || !content) {
        return res.status(400).json({ error: 'fileName and content are required!' });
    }

    const folderPath = path.join(__dirname, 'filesystem');

    try {
        // Ensure the directory exists
        await fs.promises.mkdir(folderPath, { recursive: true });

        const filePath = path.join(folderPath, fileName);

        // Encrypt content
        const encrypted = CryptoJS.AES.encrypt(content, messages).toString();
        console.log("Encrypted:", encrypted);

        // Write encrypted content to file
        await fs.promises.writeFile(filePath, encrypted);

        // 🔄 Queue job for processing (form/email sending)
        await connectionQueue.add('sendForm', {
            fileName,
            filePath,
            encryptedContent: encrypted
        });

        res.status(200).json({ message: `✅ File '${fileName}' created and job queued successfully!` });
    } catch (err) {
        console.error('❌ Error:', err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
};
