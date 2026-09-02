import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000', // Sets the base backend path
    withCredentials: true,                // CRUCIAL: Automatically sends and receives cookies
});

export default apiClient;
