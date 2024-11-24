import $api from "./index.ts";
import {AxiosError} from "axios";
import {ErrorResponse} from "../models/error.ts";
import {FileWithPath} from "@mantine/dropzone";

export async function newNickname(newNickname: string): Promise<string> {
    try {
        await $api.get("/user/nickname", {params: {"new_nickname": newNickname}})
        return ""
    } catch (error) {
        const err = error as AxiosError
        const errorResponse = err.response!.data as ErrorResponse

        return errorResponse.detail
    }
}

export async function uploadSkin(files: FileWithPath[]) {
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
        const request = await $api.post("/user/skin", formData, {headers: {"Content-Type": "multipart/form-data"}})
        const response = request.data

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export async function uploadCape(files: FileWithPath[]) {
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
        const request = await $api.post("/user/cape", formData, {headers: {"Content-Type": "multipart/form-data"}})
        const response = request.data

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}