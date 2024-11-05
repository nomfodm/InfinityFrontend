import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RegisterState {
    registering: boolean;
    messageOnRegisterPage: string;
}

const initialState: RegisterState = {
    registering: false,
    messageOnRegisterPage: "",
}

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setRegistering: (state) => {
            state.registering = true;
            state.messageOnRegisterPage = "";
        },
        setNotRegistering: (state) => {
            state.registering = false;
            state.messageOnRegisterPage = "";
        },
        setMessageOnRegisterPage: (state, action: PayloadAction<string>) => {
            state.messageOnRegisterPage = action.payload;
        },
        clearMessageOnRegisterPage: (state) => {
            state.messageOnRegisterPage = "";
        }
    }
});

export const {setRegistering, setNotRegistering, setMessageOnRegisterPage, clearMessageOnRegisterPage} = registerSlice.actions

export default registerSlice.reducer
