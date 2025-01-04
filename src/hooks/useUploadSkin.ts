import {FileWithPath} from "@mantine/dropzone";
import {$api} from "../api/axios.ts";

export function useUploadSkin() {
    async function uploadSkin(files: FileWithPath[]) {
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
            await $api.post("/user/skin", formData, {headers: {"Content-Type": "multipart/form-data"}})
        } catch (error) {
            console.error(error)
        }
    }

    return uploadSkin
}
