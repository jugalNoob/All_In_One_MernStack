// const os = require("node:os");

// let latestCPUUsage = [];

// function calculateCPU(oldCPU, newCPU) {
//     const oldTotal = Object.values(oldCPU.times).reduce((a, b) => a + b);
//     const newTotal = Object.values(newCPU.times).reduce((a, b) => a + b);

//     const idle = newCPU.times.idle - oldCPU.times.idle;
//     const total = newTotal - oldTotal;
//     const used = total - idle;

//     return ((100 * used) / total).toFixed(1);
// }

// function monitor() {
//     const oldCpus = os.cpus();
//     setTimeout(() => {
//         const newCpus = os.cpus();
//         latestCPUUsage = newCpus.map((cpu, i) => ({
//             core: i,
//             usage: calculateCPU(oldCpus[i], newCpus[i]) + "%",
//         }));
//         console.clear();
//         // console.table(latestCPUUsage);
//     }, 1000);
// }

// function startMonitoring() {
//     setInterval(monitor, 1000); // keeps updating latestCPUUsage
// }

// function getOnceCPUUsage() {
//     return Promise.resolve(latestCPUUsage);
// }

// module.exports = {
//     startMonitoring,
//     getOnceCPUUsage
// };


// const os = require("node:os");

// function calculateCPU(oldCPU, newCPU) {
//     const oldTotal = Object.values(oldCPU.times).reduce((a, b) => a + b);
//     const newTotal = Object.values(newCPU.times).reduce((a, b) => a + b);

//     const idle = newCPU.times.idle - oldCPU.times.idle;
//     const total = newTotal - oldTotal;
//     const used = total - idle;

//     return ((100 * used) / total).toFixed(1);
// }

// function monitor() {
//     const oldCpus = os.cpus();

//     setTimeout(() => {
//         const newCpus = os.cpus();

//         const usage = newCpus.map((cpu, i) => ({
//             core: i,
//             usage: calculateCPU(oldCpus[i], newCpus[i]) + "%",
//         }));

//         console.clear();
//         console.table(usage);
//     }, 1000);
// }

// function startMonitoring() {
//     setInterval(monitor, 1000);
// }

// module.exports = {startMonitoring};

// module.exports = { getCPUUsage };

const os = require("node:os");

function calculateCPU(oldCPU, newCPU) {
    const oldTotal = Object.values(oldCPU.times).reduce((a, b) => a + b);
    const newTotal = Object.values(newCPU.times).reduce((a, b) => a + b);

    const idle = newCPU.times.idle - oldCPU.times.idle;
    const total = newTotal - oldTotal;
    const used = total - idle;

    return ((100 * used) / total).toFixed(1);
}

async function getCPUUsage() {
    const oldCpus = os.cpus();

    return new Promise((resolve) => {
        setTimeout(() => {
            const newCpus = os.cpus();
            const usage = newCpus.map((cpu, i) => ({
                core: i,
                usage: calculateCPU(oldCpus[i], newCpus[i]) + "%",
            }));
            resolve(usage);
        }, 1000);
    });
}

module.exports = { getCPUUsage };
