import {getFiles} from "../api/file.api.js";
import {useEffect, useState} from "react";
import {RefreshCw} from 'lucide-react';

export default function UserTasks(){
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loadFiles = async () => {
        setIsLoading(true); // 1. Start loading animation immediately
        try {
            const files = await getFiles();

            setTasks(files?.data?.data.cleanedTasks);
            // console.log(files?.data?.data.cleanedTasks);
            setIsLoading(false); // 3. Stop animation INSIDE the timeout

        } catch (error) {
            console.error("Failed to load files", error);
            setIsLoading(false); // Stop animation if the API fails
        }
    }
    useEffect(() => {
        loadFiles();
    }, []);
    return <section className="w-full">
        <h2 className="text-lg font-semibold mb-4 text-slate-100 flex items-center justify-between">
            Tasks
            <span>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                            Total: {tasks?.length || 0}
                    </span>
                    <button
                        onClick={loadFiles}
                        disabled={isLoading}
                        className={`cursor-pointer ml-3 ${isLoading ? 'animate-spin' : " "}`}
                    >
                        <RefreshCw
                            size={16}
                            style={{animation: isLoading ? 'spin 1s linear infinite' : 'none'}}
                        />
                    </button>
                    </span>
        </h2>
        {tasks?.map(t => <div className="grid gap-4" key={t.id}>
            {/* Mocking a Task Item - You will map over your tasks array here */}
            <div
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-200">{t.fileName}</span>
                        <span
                            className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">{t.priority}</span>
                    </div>
                    <span className="text-xs text-slate-500">Process ID: {t.id}</span>
                    <span className="text-xs text-green-500">{t?.resultSum && `Result Sum: ${t?.resultSum}`}</span>
                </div>

                {/* Status Indicator (Assessment requires showing all 6 states) */}
                <div className="flex flex-col items-end gap-2 w-1/3">
                                <span className="text-sm font-medium text-blue-400">
                                    {/*5. Processing... (45%)*/}
                                    {t.status }
                                </span>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full"
                             style={{width: `${t.progress}%`}}></div>
                    </div>
                </div>
            </div>
        </div>)}

    </section>;
}