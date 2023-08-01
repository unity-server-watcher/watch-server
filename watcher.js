const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');

//cpu info
//cpu 使用率 睿频 硬件信息 
function getCpuUsage() {
    return new Promise((resolve) => {
        const cpus = os.cpus();
        let totalIdle = 0, totalTick = 0;
        cpus.forEach((cpu) => {
            for (let type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });
        const idle = totalIdle / cpus.length;
        const total = totalTick / cpus.length;
        const usage = 100 - (idle * 100) / total;
        resolve(usage.toFixed(2));
    });
}
function getCpuInfo() {
    return new Promise((resolve) => {
        const cpus = os.cpus();
        const model = cpus[0].model;
        resolve(model);
    });
}

//memory info
function getMemoryUsage() {
    return new Promise((resolve) => {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        resolve(usedMemory);
    });
}




//time info
const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentMonth = currentTime.getMonth() + 1;
const currentDay = currentTime.getDate();

const cpuUsage = getCpuUsage();
const cpuInfo = getCpuInfo();
const usedMemory = getMemoryUsage();

console.log('cpu usage: ' + cpuUsage + '%');
console.log('cpu info: ' + cpuInfo);
console.log('used memory: ' + usedMemory / 1024 / 1024 / 1024 + 'GB');
console.log('time' + currentYear + '-' + currentMonth + '-' + currentDay);

module.exports = {
    getCpuUsage,
    getCpuInfo,
    getMemoryUsage,
};