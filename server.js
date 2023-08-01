const watcher = require('./watcher');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();

const port = 7891;

app.use(express.json());

app.post('/', async (req, res) => {
    const { password } = req.body;
    const { ip } = req;
    if (password === process.env.PASSWORD) {
        const cpuUsage = await watcher.getCpuUsage() + '%';
        const cpuInfo = await watcher.getCpuInfo();
        const usedMemory = await watcher.getMemoryUsage() / 1024 / 1024 / 1024 + 'GB';
        const currentDate = new Date().toISOString().split('T')[0];
        const response = {
            authorized: true,
            cpuUsage,
            cpuInfo,
            usedMemory,
            currentDate,
            ip,
        }
        res.json(response);
    }
    else {
        const response = {
            authorized: false,
            ip,
        }
        res.json(response);
    }


});

app.listen(port, () => {
    console.log('server is running on port ' + port);
});
