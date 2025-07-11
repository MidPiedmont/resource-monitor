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
const siRequest = {
    cpu: 'cores, speedMin, speedMax',
    osInfo: 'platform, distro, release',
    versions: 'git, node, npm',
    mem: 'total, free, used, active, available',
    currentLoad: 'avgLoad, currentLoad',
    fullLoad: '*',
    processes: 'all, running, blocked, sleeping, unknown',
    fsSize: '(/dev/nvme0n1p2) *',
};

/**
 * API endpoint to get all requested system statistics.
 * Fetches data using systeminformation and returns it as JSON.
 */
app.get('/api/sys-stats', async (req, res) => {
    try {
        // Fetch all requested system information using si.get()
        const data = await si.get(siRequest);

        // Send the fetched data as a JSON response
        res.json(data);
    } catch (error) {
        console.error('Error fetching system statistics:', error);
        // Send a 500 Internal Server Error response if something goes wrong
        res.status(500).json({ error: 'Failed to fetch system statistics', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`System Stats API listening at http://localhost:${port}`);
    console.log(`Access system statistics at http://localhost:${port}/api/sys-stats`);
});


