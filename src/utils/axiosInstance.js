import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    // You can modify the request config here if needed
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error)
});

// Add a response interceptor
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error)=>{
    if (error.response ){
        if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        window.location.href = '/login';}
        else if (error.response.status===500){
            console.log("Server Error, Please Try Again Later ", error.response.data);
        }
    }
    else if(error.code==="ECONNABORTED"){
        console.log("Request Timeout. Please try again.");
    } 
    return Promise.reject(error);
});

export default axiosInstance;