import { Result } from "../../lib/error/result"
import { isCriticalError } from "../../lib/utils"
import { AuthErrorCodes } from "./errors"

import { server } from "../server"

export async function register(username: string, password: string): Promise<Result<string, AuthErrorCodes>> {
    try {
        const { data } = await server.post("/api/auth/register", {
            username, password
        })

        if (!data || (data && data.code !== "created")) {
            return {
                error: {
                    code: "unhandled",
                    message: `Unhandled response code`,
                    cause: data
                }
            }
        }

        return {
            data: data.passport
        }
    } catch (err: any) {
        if (!isCriticalError(err)) {
            return {
                error: {
                    code: err.response?.data.code as AuthErrorCodes,
                    message: err.response?.data.message
                }
            }
        }

        return {
            error: {
                code: "unhandled",
                message: err.message,
                cause: err
            }
        }
    }
}

export async function authenticate(username: string, password: string): Promise<Result<string, AuthErrorCodes>> {
    try {
        const { data } = await server.post("/api/auth/authenticate", {
            username,
            password
        })

        if (data.code !== "accepted") {
            return { error: {
                code: "unhandled",
                message: `Unhandled response code`,
                cause: data
            }}
        }

        return { data: data.passport }
    } catch (err: any) {
        if (!isCriticalError(err)) {
            return {
                error: {
                    code: err.response?.data.code,
                    message: err.response?.data.message
                }
            }
        }

        return {
            error: {
                code: "unhandled",
                message: err.message,
                cause: err
            }
        }
    }
}
