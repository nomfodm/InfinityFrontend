import $api from "./index.ts";
import {ConnectionTest} from "../models/connection.ts";
import store from "../store.ts";
import {connectionSliceActions} from "../store/auth/connectionSlice.ts";

export async function checkConnection() {
    try {
        const response = await $api.get<ConnectionTest>("/checkConnection")

        if (response.data.status !== "working") {
            store.dispatch(connectionSliceActions.error())
            return
        }

        store.dispatch(connectionSliceActions.backend())
    } catch {
        store.dispatch(connectionSliceActions.error())
    }
}