import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./store/auth/authSlice.ts"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store