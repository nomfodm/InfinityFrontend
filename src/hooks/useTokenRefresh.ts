import {useAppDispatch} from "../store/hooks.ts";
import {$api} from "../api/axios.ts";
import {TokenResponse} from "../models/auth.ts";
import {authSliceActions} from "../store/auth/authSlice.ts";

export function useTokenRefresh() {
    const dispatch = useAppDispatch()

    async function refresh() {
        const response = await $api.post<TokenResponse>("/auth/refresh")
        const accessToken = response.data.accessToken
        dispatch(authSliceActions.setAccessToken(accessToken))
        return accessToken
    }

    return refresh
}