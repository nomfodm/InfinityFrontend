import {createSlice} from "@reduxjs/toolkit";

interface ConnectionState {
    backend: boolean;
    error: boolean;
}

const initialState: ConnectionState = {
    backend: false,
    error: false,
}

export const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        backend: (state) => {
            state.backend = true;
        },
        error: (state) => {
            state.error = true;
        }
    }
})

export const connectionSliceActions = connectionSlice.actions

export default connectionSlice.reducer

