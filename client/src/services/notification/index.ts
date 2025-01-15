import { NotificationErrors } from "./errors"
import { Result } from "../../lib/error/result"

import { server } from "../server"

import { isCriticalError } from "../../lib/utils"

export async function getNotifications(passport: string): Promise<Result<any, NotificationErrors>> {
    try {
        const { data } = await server.get("/api/notifications/all", {
            headers: {
                Authorization: passport
            }
        })

        if (!data || (data && data.code !== "found")) {
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
        console.log("It fell here dude")
        if (!isCriticalError(error)) {
            return {
                error: {
                    code: error.response.data.code,
                    message: error.response.data.message
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
}