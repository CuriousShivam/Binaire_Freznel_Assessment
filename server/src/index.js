import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import fileRouter from './routes/file.routes.js';
import responseStructure from './utils/responseStructure.js';

//import { generateCsv } from './core/generateCsv.js';

// Start on Port
const PORT = process.env.PORT || 5000;

// Initialize App
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
        credentials: true
    }));
app.use(express.json());
app.use(cookieParser());
app.use(responseStructure);
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);

// Generate CSV
// generateCsv(5);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
