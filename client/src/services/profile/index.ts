import { server } from "../server"

import { Result } from "../../lib/error/result"
import { Profile } from "../../model/profile"

import { isCriticalError } from "../../lib/utils"

export type ProfileErrors =
    | "invalid_username"
    | "invalid_profile"
    | "expired_token"
    | "invalid_token"
    | "conflict"
    | "unhandled"

export async function getProfile(username: string): Promise<Result<Profile, ProfileErrors>> {
    try {
        const response = await server.get(`/api/profile/${username}`)

        if (!response.data || (response.data && response.data.code !== "found")) {
            return {
                error: {
                    code: "unhandled",
                    message: "Unhandled response from server"
                }
            }
        }

        return {
            data: response.data.profile
        }
    } catch (error: any) {
        if (!isCriticalError(error)) {
            return {
                error: {
                    code: error.response?.data.code,
                    message: error.response?.data.message
                }
            }
        }
        
        return {
            error: {
                code: "unhandled",
                message: error.message,
                cause: error,
            }
        }
    }
}

export async function createProfile(passport: string, description: string): Promise<Result<Profile, ProfileErrors>> {
    try {
        const response = await server.post("/api/profile/create", { description }, {
            headers: { Authorization: passport }
        })

        if (!response.data || (response.data && response.data.code !== "created")) {
            return {
                error: {
                    code: "unhandled",
                    message: "Unhandled response code",
                    cause: response.data,
                }
            }
        }

        return {
            data: response.data.profile,
        }
    } catch (error: any) {
        if (!isCriticalError(error)) {
            return {
                error: {
                    code: error.response?.data.code,
                    message: error.response?.data.message,
                }
            }
        }

        return {
            error: {
                code: "unhandled",
                message: error.message,
            }
        }
    }
}

export async function setProfile(passport: string, description: string): Promise<Result<Profile, ProfileErrors>> {
    try {
        const response = await server.post("/api/profile/edit", {
            description,
        }, {
            headers: {
                Authorization: passport,
            }
        })

        if (!response.data || (response.data && response.data.code !== "created")) {
            return {
                error: {
                    code: "unhandled",
                    message: "Unhandled response",
                    cause: response.data,
                }
            }
        }

        return response.data.profile
    } catch (error: any) {
        if (!isCriticalError(error)) {
            return {
                error: {
                    code: error.response?.data.code,
                    message: error.response?.data.message,
                }
            }
        }

        return {
            error: {
                code: "unhandled",
                message: "An unhandled error occurred",
                cause: error,
            }
        }
    }
}
