
// const os = require('os');
// const cluster = require('node:cluster');
// const process = require('node:process');
// const numCPUs = os.cpus().length;


// const startServer = (app, port) => {  // port :: 9000 ,
//     if (cluster.isPrimary) {
//         console.log(`Primary ${process.pid} is running`);
        
//         // Fork workers.
//         for (let i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }

//         cluster.on('exit', (worker, code, signal) => {
//             console.log(`Worker ${worker.process.pid} died  code ${code} with signal ${signal}`);
            
//             if (signal) {
//                 console.log(`Worker was killed by signal: ${signal}`);
//             } else if (code !== 0) {
//                 console.log(`Worker exited with error code: ${code}`);
//             } else {
//                 console.log('Worker success!');
//             }
            
            
//             cluster.fork();  // Rsestart a worker if it dies
//         });

//     } else {

        

//         app.get("/io" , (req,res)=>{
//             res.send(`Worker ${process.pid} is`);
//         })
//         app.listen(port, () => {
//             console.log(`Worker ${process.pid} is running at http://localhost:${port}`);
//         });
//     }
// };

// module.exports = startServer;




