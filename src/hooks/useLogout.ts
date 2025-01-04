import {useAppDispatch} from "../store/hooks.ts";
import {authSliceActions} from "../store/auth/authSlice.ts";
import {$api} from "../api/axios.ts";

export function useLogout() {
    const dispatch = useAppDispatch();

    async function logout() {
        dispatch(authSliceActions.logout())
        try {
            await $api.post("/auth/logout")
        } catch (error) {
            console.error(error)
        }
    }

    return logout
}