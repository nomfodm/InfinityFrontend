import {FileWithPath} from "@mantine/dropzone";
import {$api} from "../api/axios.ts";

export function useUploadCape() {
    async function uploadCape(files: FileWithPath[]) {
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
            await $api.post("/user/cape", formData, {headers: {"Content-Type": "multipart/form-data"}})
        } catch (error) {
            console.error(error)
        }
    }

    return uploadCape
}