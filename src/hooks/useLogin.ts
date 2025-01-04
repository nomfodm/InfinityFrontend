import {$api} from "../api/axios.ts";
import {SignInResponse} from "../models/auth.ts";
import {authSliceActions} from "../store/auth/authSlice.ts";
import store from "../store.ts";
import {useFetchUser} from "./useFetchUser.ts";

export function useLogin() {
    const fetchUser = useFetchUser()

    async function login(username: string, password: string) {
        const response = await $api.post<SignInResponse>("/auth/signin", {username, password})

        const accessToken = response.data.accessToken
        store.dispatch(authSliceActions.setAccessToken(accessToken))

        await fetchUser()
    }

    return login
}