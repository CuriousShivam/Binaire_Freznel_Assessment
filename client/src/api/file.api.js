import apiClient from "./axios-setup.js";
import {assertSourceType} from "@babel/core/lib/config/validation/option-assertions.js";

const uploadFile = async (files, priority) => {
    let response;
    try {
        // 1. Create a FormData instance to merge files and string inputs
        const formData = new FormData();
        formData.append('priority', priority);

        // 2. Append all files to the payload under the same key for multiple file processing
        files.forEach((file) => {
            formData.append('files', file);
        });

        //console.log("inside UploadFile Api ", files, priority)

        // 3. Make backend REST API network call
        response = await apiClient.post('/api/file/upload-files', formData);

        // console.log("Inside upload file function : " + JSON.stringify(response));

        if (response?.status !== 200) {
            throw new Error(`Upload failed with status code ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
    return response;
}

const getFiles = async () => {
    let response;
    try {
        // The browser will automatically attach the cookie if it exists
        response = await apiClient.get('/api/file/getFiles');
        // console.log('Session status:', response.data.message);

        // If it was a new user, the backend just automatically saved new user and sent
        // the new cookie from the response headers!
    } catch (error) {
        console.error('Failed to load files:', error);
    }
    return response;
}
export {uploadFile, getFiles};