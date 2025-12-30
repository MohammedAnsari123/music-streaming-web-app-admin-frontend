import axios from 'axios';

// Create a configured instance of axios
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor: Attach Token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 (Unauthorized)
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        // Check if error is 401 (Unauthorized)
        if (response && response.status === 401) {
            // Clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect to login
            // Using window.location to force a full refresh and clear state
            window.location.href = '/admin/login';
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
