import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./store/auth/authSlice.ts"
import RegisterReducer from "./store/auth/registerSlice.ts"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        register: RegisterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store