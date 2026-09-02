import { initializeSession } from "../api/user.api.js";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const initUser = async () => {
        setIsLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await initializeSession();

            if (response?.status !== 200) {
                setMessage({ text: "Something went wrong. Please try again later.", type: 'error' });
                setIsLoading(false);
                return;
            }

            // Success flow
            setMessage({ text: "Success! Connecting to queue...", type: 'success' });
            setTimeout(() => {
                navigate('/app');
            }, 1000);

        } catch (error) {
            setMessage({ text: "Network error. Is the server running?", type: 'error' });
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 p-4 font-sans antialiased selection:bg-blue-500/30">
            <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-100 tracking-tight">
                        Node.js Queue Visualizer
                    </h3>

                    {/* Dynamic Message Rendering */}
                    {message.text && (
                        <p className={`mt-2 text-sm font-medium leading-relaxed ${
                            message.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                            {message.text}
                        </p>
                    )}
                </div>

                <button
                    onClick={initUser}
                    disabled={isLoading}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98] active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                    {isLoading ? 'Connecting...' : 'Get Started'}
                </button>
            </div>
        </div>
    );
}