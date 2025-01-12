import axios from "axios";

export const $api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"},
    timeout: 3000,
})
