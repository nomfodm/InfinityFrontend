import {useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {$api} from "../api/axios.ts";
import axios, {AxiosError} from "axios";
import {useTokenRefresh} from "./useTokenRefresh.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useLogout} from "./useLogout.ts";

export function usePrivateApi() {
    const authState = useAppSelector(state => state.auth)
    const refresh = useTokenRefresh()

    const navigate = useNavigate();
    const location = useLocation();

    const logout = useLogout()

    useEffect(() => {
        const requestInterceptor = $api.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${authState.accessToken}`
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )


        const responseInterceptor = $api.interceptors.response.use(
            response => response,
            async (err) => {
                if (axios.isAxiosError(err)) {
                    const error = err as AxiosError
                    const prevRequest = error?.config
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (error?.response?.status === 401 && !prevRequest!.sent) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        prevRequest!.sent = true
                        try {
                            const newAccessToken = await refresh()
                            prevRequest!.headers["Authorization"] = `Bearer ${newAccessToken}`
                            return $api(prevRequest!)
                        } catch {
                            await logout()
                            navigate("/login", { state: { from: location }, replace: true })
                        }
                    }
                }
                return Promise.reject(err)
            }
        )

        return () => {
            $api.interceptors.request.eject(requestInterceptor);
            $api.interceptors.response.eject(responseInterceptor);
        }

    }, [refresh, authState, logout, navigate, location])

    return $api
}