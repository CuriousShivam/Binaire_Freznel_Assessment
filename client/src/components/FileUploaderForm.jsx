import {useState} from "react";
import FileUploader from "./FileUploader.jsx";
import {uploadFile} from "../api/file.api.js";

export default function FileUploaderForm(){
    const [tasks, setTasks] = useState([]);
    const [files, setFiles] = useState([]);
    const [priority, setPriority] = useState('low');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent standard page reload
        if (files.length === 0) {
            alert('Please select at least one file before uploading.');
            return;
        }
        setIsUploading(true);
        //console.log("inside FileUploaderForm handleUpload ",files, priority)
        try {
            const result = await uploadFile(files, priority);
            // console.log("Result: " + result);
            if(result?.status === 200){
                alert('Files and task parameters successfully uploaded!');
            }else{
                alert('Failed to upload files and task parameters.');
            }

            // Clear selection on success
            setFiles([]);
        } catch (error) {
            console.error('Error uploading metadata/files:', error);
            alert('An error occurred during submission. Check your backend server connections.');
        } finally {
            setIsUploading(false);
        }
    };

    return <form
        onSubmit={handleUpload}
        className="w-full max-w-xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
    >
        <h2 className="text-lg font-semibold mb-4 text-slate-100">Submit New Task</h2>

        {/* File Input */}
        <FileUploader files={files} setFiles={setFiles}/>

        {/* Priority Selector (Required by assessment) */}
        <div className="flex gap-4 mb-6">
            <label
                className="flex-1 flex items-center gap-2 bg-slate-800 p-3 rounded-lg cursor-pointer border border-transparent hover:border-slate-600 transition-all">
                <input type="radio" name="priority" value="low" defaultChecked
                       className="text-blue-500"/>
                <span className="text-sm font-medium">Low Priority</span>
            </label>
            <label
                className="flex-1 flex items-center gap-2 bg-slate-800 p-3 rounded-lg cursor-pointer border border-transparent hover:border-slate-600 transition-all">
                <input type="radio" name="priority" value="high" className="text-emerald-500"/>
                <span className="text-sm font-medium">High Priority</span>
            </label>
        </div>

        <button
            type="submit"
            disabled={isUploading}
            className={`w-full font-medium py-3 rounded-xl transition-all shadow-lg text-white ${
                isUploading
                    ? 'bg-slate-700 cursor-not-allowed shadow-none'
                    : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
            }`}
        >
            {isUploading ? 'Uploading Payload...' : 'Upload to Server'}
        </button>
    </form>;
}