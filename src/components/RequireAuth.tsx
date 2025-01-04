import {useAppSelector} from "../store/hooks.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RequireAuth() {
    const authState = useAppSelector(state => state.auth);
    const location = useLocation();

    return (
        authState.user
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )

}