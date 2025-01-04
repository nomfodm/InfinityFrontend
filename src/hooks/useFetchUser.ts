import {usePrivateApi} from "./usePrivateApi.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../models/user.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {authSliceActions} from "../store/auth/authSlice.ts";
import {useLogout} from "./useLogout.ts";

export function useFetchUser() {
    const apiPrivate = usePrivateApi()
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useLogout();

    const dispatch = useAppDispatch()

    async function fetchUser() {
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            const response = await apiPrivate.get<User>("/user/me")
            dispatch(authSliceActions.setUser(response.data))
        } catch (error) {
            console.error(error)
            await logout()
            navigate("/login", { state: { from: location }, replace: true })
        }
    }

    return fetchUser

}