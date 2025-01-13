import { NotificationErrors } from "./errors"
import { Result } from "../../lib/error/result"

import { server } from "../server"

import { isCriticalError } from "../../lib/utils"

export async function getNotifications(passport: string): Promise<Result<any, NotificationErrors>> {
    try {
        const { data } = await server.get("/notifications/all", {
            headers: {
                Authorization: passport
            }
        })

        if (!data || (data && data.code !== "created")) {
            return {
                error: {
                    code: "unhandled",
                    message: "Unhandled response code",
                    cause: data
                }
            }
        }

        return {
            data: data.notifications
        }
    } catch (error: any) {
        if (!isCriticalError(error)) {
            return {
                error: {
                    code: error.code,
                    message: error.message
                }
            }
        }

        console.log("Failed to get all the notifications due to an unhandled error: ", error)
        return {
            error: {
                code: "unhandled",
                message: error.message,
            }
        }
    }
    
    return {
        error: {
            code: "unhandled",
            message: "unhandled error dude"
        }
    }
}