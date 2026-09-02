import React, { useState, useRef } from 'react';
import { Upload, X, FileText } from 'lucide-react';

export default function FileUploader({files, setFiles}) {
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef(null);

    // Trigger click on hidden input
    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    // Handle files when chosen via file browser
    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            addUniqueFiles(selectedFiles);
        }
    };

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files).filter(
                (file) => file.name.endsWith('.csv') // Restrict to CSVs on drop
            );
            addUniqueFiles(droppedFiles);
        }
    };

    // Prevent duplicate files from being added
    const addUniqueFiles = (newFiles) => {
        setFiles((prevFiles) => {
            const existingNames = new Set(prevFiles.map(f => f.name));
            const uniqueNewFiles = newFiles.filter(f => !existingNames.has(f.name));
            return [...prevFiles, ...uniqueNewFiles];
        });
    };

    // Remove file from list
    const removeFile = (fileNameToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileNameToRemove));
        // Reset native input so the same file can be uploaded again if deleted
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Drag & Drop Area */}
            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer mb-4 ${
                    isDragActive
                        ? "border-blue-500 bg-slate-800/50"
                        : "border-slate-700 hover:border-blue-500 bg-transparent"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
            >
                <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <p className="text-slate-400 text-sm">
                    Drag and drop CSV files here, or <span className="text-blue-500 underline font-medium">click to browse</span>
                </p>

                {/* Hidden Input with 'multiple' attribute */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {/* File Preview List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                        Selected Files ({files.length})
                    </p>
                    <ul className="border rounded-lg divide-y divide-slate-800 bg-slate-900/50 overflow-hidden">
                        {files.map((file) => (
                            <li key={file.name} className="flex items-center justify-between p-3 text-sm text-slate-300">
                                <div className="flex items-center space-x-3 truncate mr-4">
                                    <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                                    <span className="truncate font-medium">{file.name}</span>
                                    <span className="text-xs text-slate-500 shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the container click
                                        removeFile(file.name);
                                    }}
                                    className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
                                    title="Remove file"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
