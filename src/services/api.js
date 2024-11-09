import axios from "axios";
import store from "@/redux/store/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

//bind the token to the header
api.interceptors.request.use((config) => {
    const token = store.getState().mainReducer.userToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
