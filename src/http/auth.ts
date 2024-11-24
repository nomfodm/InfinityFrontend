import $api from "./index.ts";
import {SignInResponse} from "../models/auth.ts";
import {ErrorResponse} from "../models/error.ts";
import {User} from "../models/user.ts";
import store from "../store.ts";
import * as authReducer from "../store/auth/authSlice.ts";
import * as registerReducer from "../store/auth/registerSlice.ts";
import {AxiosError} from "axios";
import {clearMessageOnLoginPage, setMessageOnLoginPage} from "../store/auth/authSlice.ts";
import {setMessageOnRegisterPage, setNotRegistering} from "../store/auth/registerSlice.ts";

export async function checkAuth() {
    if (localStorage.getItem("token")) {
        await me()
    }
}

export async function login(username: string, password: string): Promise<boolean> {
    store.dispatch(authReducer.authing())
    await new Promise((resolve) => {setTimeout(resolve, 1000)});
    try {
        const request = await $api.post<SignInResponse>("/auth/signin", {username, password})
        const response = request.data

        localStorage.setItem("token", response.accessToken)
        store.dispatch(clearMessageOnLoginPage())
        await me()
        return true

    } catch (error) {
        const err = error as AxiosError
        const errorResponse = err.response!.data as ErrorResponse

        store.dispatch(setMessageOnLoginPage(errorResponse.detail))
        store.dispatch(authReducer.logout())
        return false
    }
}

export async function register(username: string, email: string, password: string): Promise<boolean> {
    store.dispatch(registerReducer.setRegistering())
    await new Promise((resolve) => {setTimeout(resolve, 1000)});
    try {
        await $api.post("/auth/signup", {username, password, email})
        await login(username, password)

        store.dispatch(setNotRegistering())
        return true
    } catch (error) {
        const err = error as AxiosError
        const errorResponse = err.response!.data as ErrorResponse

        store.dispatch(setNotRegistering())
        store.dispatch(setMessageOnRegisterPage(errorResponse.detail))
        return false
    }
}

export async function me() {
    const token = localStorage.getItem("token");
    if (!token) {
        return
    }

    try {
        const request = await $api.get<User>("/user/me")
        const response = request.data
        store.dispatch(authReducer.login(response))
    } catch (error) {
        store.dispatch(authReducer.logout())
        console.log(error)
    }
}

export async function logout() {
    try {
        await $api.post("/auth/logout")
    } catch (error) {
        console.log(error)
    } finally {
        localStorage.removeItem("token");
        store.dispatch(authReducer.logout())
    }
}