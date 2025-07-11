// index.js
const express = require('express');
const si = require('systeminformation'); // Import the systeminformation library

const app = express();
const port = 3003; // You can change this port if needed

// Enable CORS for your frontend to access this API
// In a production environment, you would restrict this to specific origins.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for simplicity
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Define the request object for systeminformation
const siStaticRequest = {
    cpu: 'cores, speedMin, speedMax',
    osInfo: 'platform, distro, release',
    versions: 'git, node, npm',
};
const siDynamicRequest = {
    mem: 'total, free, used, active, available',
    currentLoad: 'avgLoad, currentLoad',
    fullLoad: '*',
    processes: 'all, running, blocked, sleeping, unknown',
    fsSize: '(/dev/nvme0n1p2) *',
};

// path for info that doesn't change over time
app.get('/static', async (req, res) => {
    try {
        // Fetch all requested system information using si.get()
        const data = await si.get(siStaticRequest);
        res.json(data);
    } catch (error) {
        console.error('Error fetching system statistics:', error);
        res.status(500).json({ error: 'Failed to fetch system statistics', details: error.message });
    }
});

// path for info that changes over time
app.get('/dynamic', async (req, res) => {
    try {
        // Fetch all requested system information using si.get()
        const data = await si.get(siDynamicRequest);
        res.json(data);
    } catch (error) {
        console.error('Error fetching system statistics:', error);
        res.status(500).json({ error: 'Failed to fetch system statistics', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`System Stats API listening at http://localhost:${port}`);
    console.log(`Access static system statistics at http://localhost:${port}/static`);
    console.log(`Access dynamic system statistics at http://localhost:${port}/dynamic`);
});


