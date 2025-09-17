const express = require("express");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const cors = require('cors');



const app = express();
const port = 9000;


app.use(cors({
    origin: 'http://localhost:5173'
  }));
  


// app.get("/video/streaming", (req, res) => {


// const videoPath = path.join(__dirname, "sample.mp4");
    
// const stat=fs.statSync(videoPath)

// const filesize=stat.size;

// const range = req.headers.range;
//     if (!range) {
//         return res.status(416).send("Range header required");
//     }

//     // const videoSize = stats.size; ----- >>> <<< 



// const CHUNK_SIZE = 10 ** 6; // 1MB per chunk
//     const start = Number(range.replace(/\D/g, ""))

//     const end = Math.min(start + CHUNK_SIZE, filesize);

// const contentLength=end-start+1

//     const filestream=fs.createReadStream(videoPath ,{

//         start,
//         end
//     })

// filestream.pipe(res)

// const header={

//             "Content-Range": `bytes ${start}-${end}/${filesize}`,
//             "Accept-Ranges": "bytes",
//             "Content-Length": contentLength,
//             "Content-Type": "video/mp4",
// }

// res.writeHead(206,header)

// })




app.get("/video/streaming", (req, res) => {
    const videoPath = path.join(__dirname, "sample.mp4");
    




    fs.stat(videoPath, (err, stats) => {
        if (err) {
            return res.status(404).send("Video not found");
        }

        const range = req.headers.range;
        if (!range) {
            return res.status(416).send("Range header required");
        }

        const videoSize = stats.size;
        const CHUNK_SIZE = 10 ** 6; // 1MB per chunk

        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Optional: Check if client accepts gzip (not really used for mp4)
        if (req.headers['accept-encoding']?.includes('gzip')) {
            const gzip = zlib.createGzip();
            res.setHeader("Content-Encoding", "gzip");
            videoStream.pipe(gzip).pipe(res);
        } else {
            videoStream.pipe(res);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

{/* <video controls width="640">
  <source src="http://localhost:9000/video/streaming" type="video/mp4">
</video> */}
