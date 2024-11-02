import axios from "axios";

//TODO: check url in deployment
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});
