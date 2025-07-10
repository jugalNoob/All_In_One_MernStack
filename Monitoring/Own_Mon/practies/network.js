const os = require('os');

function getNetworkBytes() {
    const interfaces = os.networkInterfaces();

    // console.log(interfaces)
    const stats = {};

    for (const [name, infos] of Object.entries(interfaces)) {
        for (const info of infos) {
            if (info.family === 'IPv4' && !info.internal) {
                // On most systems, bytes received/sent are not provided by os,
                // so we can only track IP/interface availability here unless we use a system command.
                stats[name] = {
                    address: info.address,
                    mac: info.mac,
                    netmask: info.netmask,
                };
            }
        }
    }

    return stats;
}


console.log(getNetworkBytes());



// const os = require('os');

// function getNetworkInterfaces() {
//     const interfaces = os.networkInterfaces();
//     const stats = {};

//     for (const [name, infos] of Object.entries(interfaces)) {
//         stats[name] = [];

//         for (const info of infos) {
//             if (!info.internal) {
//                 stats[name].push({
//                     family: info.family,
//                     address: info.address,
//                     netmask: info.netmask,
//                     mac: info.mac,
//                 });
//             }
//         }

//         // Remove interface if it's empty (e.g. all internal)
//         if (stats[name].length === 0) {
//             delete stats[name];
//         }
//     }

//     return stats;
// }

// console.log(getNetworkInterfaces());
