import {User} from "../../models/user.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    authed: boolean;
    authing: boolean;
    messageOnLoginPage: string;
    user?: User;
}

const initialState: AuthState = {
    authed: false,
    authing: false,
    messageOnLoginPage: "",
    user: JSON.parse(localStorage.getItem("user")!),
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authing: (state) => {
            state.authing = true;
        },
        login: (state, action: PayloadAction<User>) => {
            state.authed = true;
            state.authing = false;
            state.user = action.payload;
        },
        logout: (state) => {
            state.authed = false;
            state.authing = false;
            state.user = undefined;
        },
        setMessageOnLoginPage: (state, action: PayloadAction<string>) => {
            state.messageOnLoginPage = action.payload;
        },
        clearMessageOnLoginPage: (state) => {
            state.messageOnLoginPage = "";
        }
    }
})

export const {authing, login, logout, setMessageOnLoginPage, clearMessageOnLoginPage} = authSlice.actions

export default authSlice.reducer

