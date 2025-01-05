import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import {useTokenRefresh} from "../hooks/useTokenRefresh.ts";
import {useAppSelector} from "../store/hooks.ts";
import {useFetchUser} from "../hooks/useFetchUser.ts";
import {Box, Loader, LoadingOverlay, Text} from "@mantine/core";
import {useConnectionTest} from "../hooks/useConnectionTest.ts";
import {useLogout} from "../hooks/useLogout.ts";

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);

    const [connected, setConnected] = useState(false);
    const [connectionError, setConnectionError] = useState("");

    const refresh = useTokenRefresh();
    const authState = useAppSelector(state => state.auth);

    const fetchUser = useFetchUser();

    const testConnection = useConnectionTest()


    const logout = useLogout()

    useEffect(() => {
        let isMounted = true;

        async function connectionTest(): Promise<boolean> {
            const connectionTestResult = await testConnection()
            if (!connectionTestResult) {
                setConnected(true);
                return true;
            } else if (connectionTestResult === "0") {
                setConnectionError("Сервера выключены, возможно проводятся тех.работы");
            } else if (connectionTestResult === "1") {
                setConnectionError("Не удалось подключиться к серверам Infinity");
            }
            return false;
        }

        async function verifyRefreshToken() {
            try {
                await refresh();
                await fetchUser();
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        async function wrapper() {
            await new Promise(resolve => setTimeout(resolve, 500));

            const connected_ = await connectionTest();
            if (!connected_) {
                setIsLoading(false);
                return
            }

            if (!authState.accessToken && authState.persist) {
                await verifyRefreshToken();
            } else {
                setIsLoading(false);
                await logout();
            }
        }

        wrapper()

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
                <Box h={"100vh"} pos={"relative"}>
                    <LoadingOverlay transitionProps={{transition: "fade", duration: 500}}
                                    visible={isLoading || !connected}
                                    zIndex={1000}
                                    overlayProps={{radius: "sm", backgroundOpacity: 1}}
                                    loaderProps={{
                                        children:
                                            isLoading
                                                ? <Loader color="blue"/>
                                                : <Text ta={"center"}>{connectionError}</Text>
                                    }}
                    />
                    {!isLoading && connected && <Outlet/>}
                </Box>

        </>
    )
}
