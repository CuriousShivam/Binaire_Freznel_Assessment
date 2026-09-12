import express from 'express';
import {fileUpload, getUploadedFilesByUserId} from '../service/file.controller.js';
import multer from "multer";
import path from 'path';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();
// Ensure the uploads directory exists before Multer tries to write to it
const UPLOAD_DIR = path.resolve('./uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, {recursive: true});
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {

        // Generate UUID for the file
        const fileId = uuidv4();

        // Extract the original extension (e.g., .csv)
        const ext = path.extname(file.originalname) || '.csv';

        // Attach the ID to the file object so we can access it in the route handler below
        file.generatedId = fileId;

        // Save file as UUID.csv
        cb(null, `${fileId}${ext}`);
    }
});

const uploadMiddleware = multer({storage});
router.post('/upload-files', uploadMiddleware.array('files') ,fileUpload);
router.get('/getFiles',getUploadedFilesByUserId);
export default router;

