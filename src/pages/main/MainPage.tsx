import {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {clearMessageOnLoginPage} from "../../store/auth/authSlice.ts";

export default function MainPage() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearMessageOnLoginPage())
        document.title = "Infinity"
    }, [])
    return (
        <>
        </>
    )
}

