const os = require('os');

// Function to get network information
function getNetworkBytes() {
    const interfaces = os.networkInterfaces();
    const stats = {};

    for (const [name, infos] of Object.entries(interfaces)) {
        for (const info of infos) {
            if (info.family === 'IPv4' && !info.internal) {
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

module.exports = { getNetworkBytes };
