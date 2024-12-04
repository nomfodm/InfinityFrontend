import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./store/auth/authSlice.ts"
import RegisterReducer from "./store/auth/registerSlice.ts"
import ConnectionReducer from "./store/auth/connectionSlice.ts"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        register: RegisterReducer,
        connection: ConnectionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store