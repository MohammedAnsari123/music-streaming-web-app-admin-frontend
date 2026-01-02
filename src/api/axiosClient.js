import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://music-streaming-web-app-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

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

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response && response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/admin/login';
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
