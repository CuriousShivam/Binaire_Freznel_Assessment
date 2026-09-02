import apiClient from "./axios-setup.js";

const initializeSession = async () => {
    try {
        // The browser will automatically attach the cookie if it exists
        const response = await apiClient.get('/api/user/init-user');
        console.log('Session status:', response.data.message);

        // If it was a new user, the browser just automatically saved
        // the new cookie from the response headers!
    } catch (error) {
        console.error('Failed to initialize session:', error);
    }
};

export { initializeSession };