
import {v4 as uuidv4} from 'uuid';

import {Task} from '../core/Task.js';
import dataGroup from "../core/QueueManager.js";


function fileUpload(req, res) {
    //console.log('inside fileUpload controller')

    // Validate files exist
    if (!req.files || req.files.length === 0) {
        return res.error('No files were uploaded.', 404);
    }

    // 3. Extract priority from the form data (fallback to 'low' if missing)
    const priority = req.body.priority === 'high' ? 'high' : 'low';
    const newTasks = [];

    // 4. Process each uploaded file
    req.files.forEach(file => {
        const taskId = file.generatedId;
        const filePath = file.path; // Absolute path on the server

        // Instantiate the Task (Status defaults to 'uploaded' inside the constructor)
        const task = new Task(taskId, req.userId, file.originalname, filePath, priority);

        // Save to our DataGroup (Memory mapping)
        dataGroup.addTask(task);

        // Collect DTOs to send back to the frontend
        newTasks.push(task.toDTO());
    });

    // 5. Respond with success
    res.ok('Files successfully uploaded and queued.',newTasks)
}

function getUploadedFilesByUserId(req, res){
    if ( dataGroup.hasUser(req.userId)) {
        const tasks = dataGroup.getUserTasks(req.userId)
        const cleanedTasks = tasks.map(({ id, fileName,priority,status, progress,resultSum }) => ({ id, fileName,priority,status, progress,resultSum }));

        //console.log(cleanedTasks);
        res.ok('Files successfully uploaded and queued.',cleanedTasks);
    }
    else{
        res.error('User not found', 400);
    }
}
export {fileUpload,getUploadedFilesByUserId};