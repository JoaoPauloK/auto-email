import api from "@/api/api";
import type { AxiosResponse } from "axios";

export function sendTextData(content: string, authenticated: boolean = false): Promise<AxiosResponse> {
    const endpoint: string = authenticated ? "/new" : "/new-no-user";
    return api.post(endpoint, { content, type: 'plain' }, {
        headers: { "Content-Type": "application/json" },
    });
}

export function sendFileData(
    data: FormData,
    authenticated: boolean = false
): Promise<AxiosResponse> {
    const endpoint: string = authenticated ? "/new-file" : "/new-file-no-user";
    return api.post(endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function newUser(username: string, password: string) {
    return api.post('/user', { username, password })
}