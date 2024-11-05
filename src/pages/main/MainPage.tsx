import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {clearMessageOnLoginPage} from "../../store/auth/authSlice.ts";
import {Link} from "react-router-dom";

export default function MainPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearMessageOnLoginPage())
        document.title = "Infinity"
    }, [])
    return (
        <>
            {/*<Link to={"/register"}>register</Link>*/}
        </>
    )
}

