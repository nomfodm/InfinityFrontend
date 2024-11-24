import axios, {AxiosError} from "axios";
import {ErrorResponse} from "../models/error.ts";
import {TokenResponse} from "../models/auth.ts";
import store from "../store.ts";
import {logout} from "../store/auth/authSlice.ts";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const response = error.response?.data as ErrorResponse
        if (error.status === 401 && response.error === "Unauthorized") {
            try {
                const refreshRequest = await $api.post<TokenResponse>("/auth/refresh")
                const refreshResponse = refreshRequest.data

                localStorage.setItem("token", refreshResponse.accessToken)
                const config = error.config!
                config.headers.Authorization = `Bearer ${refreshResponse.accessToken}`

                return axios(config)
            } catch (error) {
                console.log(error)
                localStorage.removeItem("token")
                store.dispatch(logout())
            }
        }

        return Promise.reject(error)
    })


export default $api