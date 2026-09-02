import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000',
    withCredentials: true,
});

// Interceptor to add x-user-id header
apiClient.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId');
        //console.log("UserID : ", userId)

        if (userId) {
            config.headers['x-user-id'] = userId;
        }

        return config;
    },
    (error) => {
        // Handle any request setup errors
        return Promise.reject(error);
    }
);

export default apiClient;