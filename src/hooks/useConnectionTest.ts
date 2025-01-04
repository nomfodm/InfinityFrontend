import {$api} from "../api/axios.ts";
import axios from "axios";

export function useConnectionTest() {
    interface ConnectionTestResponse {
        status: string;
    }

    async function connectionTest(): Promise<string | undefined> {
        try {
            const response = await axios.get<ConnectionTestResponse>(import.meta.env.VITE_STORAGE_BASE_URL + "/checkConnection?ts=" + new Date().getTime())
            if (response.data.status !== "working") {
                return "0"
            }
            await $api.get("/checkConnection");
            return undefined
        } catch {
            return "1"
        }
    }

    return connectionTest
}