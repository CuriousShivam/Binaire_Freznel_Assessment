import apiClient from "./axios-setup.js";

const initializeSession = async () => {
    let response;
    try {

        // The browser will automatically attach the cookie if it exists
        response = await apiClient.get('/api/user/init-user');
        console.log('Session status:', response.data.message);

        // If it was a new user, the browser just automatically saved
        // the new cookie from the response headers!
    } catch (error) {
        console.error('Failed to initialize session:', error);
    }
    return response;
};

export { initializeSession };