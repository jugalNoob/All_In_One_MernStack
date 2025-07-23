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