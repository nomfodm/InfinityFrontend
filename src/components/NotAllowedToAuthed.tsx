import {useAppSelector} from "../store/hooks.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function NotAllowedToAuthed() {
    const authState = useAppSelector(state => state.auth);
    const location = useLocation();

    return (
        authState.user
            ? <Navigate to="/pa" state={{from: location}} replace/>
            : <Outlet/>
    )

}