
let messages="jhjdcskhjhcfsiyhfsciufvsyuifcsyugfsvyu"
var CryptoJS = require("crypto-js");
const fs = require('fs')
const path = require('path');

exports.userDelete = async (req, res) => {
    const { fileName } = req.body;

    if (!fileName) {
        return res.status(400).json({ error: "fileName is required!" });
    }

    try {
        // Go up from 'routes' to 'server' folder
        // const filePath = path.join(__dirname, "..", fileName);
           // Correctly build the file path to include the file name
           const filePath = path.join(__dirname, 'filesystem', fileName);

        console.log("Attempting to delete:", filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: `File '${fileName}' not found at ${filePath}` });
        }

        await fs.promises.unlink(filePath);
        res.status(200).json({ message: `File '${fileName}' deleted successfully!` });
    } catch (err) {
        console.error("Error deleting file:", err);
        res.status(500).json({ error: "Failed to delete file" });
    }
};