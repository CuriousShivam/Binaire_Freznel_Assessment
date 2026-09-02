import {useEffect, useState} from "react";
import FileUploaderForm from "./FileUploaderForm.jsx";
import {getFiles} from "../api/file.api.js";
import {RefreshCw} from 'lucide-react';
import UserTasks from "./UserTasks.jsx";

export default function AppDashboard() {

    return (<div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">

        {/* Header Area */}
        <header
            className="max-w-5xl mx-auto mb-10 flex justify-between items-center border-b border-slate-800 pb-4">
            <h1 className="text-2xl font-bold  text-blue-400  ">
                Global Processing Queue
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="relative flex h-3 w-3">
                      <span
                          className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
            </div>
        </header>

        <main className="max-w-5xl mx-auto flex flex-col gap-10">

            {/* 1. TOP CENTER: The Upload Section */}
            <section
                className="w-full max-w-xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                <FileUploaderForm/>
            </section>

            {/* 2. User Tasks Visualizer */}
            <UserTasks/>

        </main>
    </div>);
}