import api from "@/api/api";
import type { SendEmailResponse, HistoryResponse, NewUserResponse } from "@/api/schemas";

export function sendTextData(content: string, authenticated: boolean = false): Promise<{ data: SendEmailResponse }> {
    const endpoint: string = authenticated ? "/new" : "/new-no-user";
    return api.post(endpoint, { content, type: 'plain' }, {
        headers: { "Content-Type": "application/json" },
    });
}

export function sendFileData(
    data: FormData,
    authenticated: boolean = false
): Promise<{ data: SendEmailResponse } > {
    const endpoint: string = authenticated ? "/new-file" : "/new-file-no-user";
    return api.post(endpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}

export function newUser(email: string, password: string): Promise<NewUserResponse> {
    return api.post('/user', { email, password })
}

export function listEmails(): Promise<{ data: HistoryResponse[] }> {
    return api.get('/emails')
}