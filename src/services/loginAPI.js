import axios from "axios";

const loginAPI = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default loginAPI;
