import { HttpStatusCode, isAxiosError } from "axios";
import { isNetworkError, parseResponseStatusError } from "../../lib/axios"
import { Result } from "../../lib/result";

import fetcher from "./instance";

export async function register(username: string, password: string): Promise<Result<string>> {
    try {
        const { data, status } = await fetcher.post("/register", {
            username,
            password
        })

        if (status !== HttpStatusCode.Created) {
            throw new Error(`Received ${status} as status code but the client doesn't know how to handle it!`)
        }

        return { data: data.data.token }
    } catch (err: any) {
        if (isAxiosError(err) && !isNetworkError(err)) {
            throw parseResponseStatusError(err.response?.status)
        }

        console.log("[Register] Failed to handle the response of the request ", err)
        return { error: "unhandled" }
    }
    
}

export async function authenticate(username: string, password: string): Promise<Result<string>> {
    try {
        const { data, status } = await fetcher.post("/authenticate", {
            username, password
        })

        if (status !== HttpStatusCode.Accepted) {
            throw new Error(`Received ${status} as status code but the client doesn't know how to handle it!`)
        }

        return { data: data.data.token }
    } catch (err) {
        if (isAxiosError(err) && !isNetworkError(err)) {
            throw parseResponseStatusError(err.response?.status)
        }

        console.log(err)
        return { error: "unhandled" }
    }
}