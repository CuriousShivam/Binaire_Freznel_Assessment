const express = require('express');
const http = require('http');
const cors = require('cors');

// Initialize App and Index
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Start Index
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
