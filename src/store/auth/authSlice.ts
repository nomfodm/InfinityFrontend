import {User} from "../../models/user.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    // authing: boolean;
    user?: User;
    accessToken?: string;
    persist: boolean;
}

const initialState: AuthState = {
    user: undefined,
    accessToken: undefined,
    persist: JSON.parse(localStorage.getItem("persist")!) && true
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
        setPersist: (state, action: PayloadAction<boolean>) => {
            state.persist = action.payload;
        }
    }
})

export const authSliceActions = authSlice.actions

export default authSlice.reducer

