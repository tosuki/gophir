import { Request, Response } from "express"

import { NotificationUsecase } from "../usecase/notification/NotificationUsecase"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { z } from "zod"

import { isZodError } from "../library/error/ZodError"
import { isAuthError } from "../library/error/AuthError"

import { HttpResponseCode } from "../library/http/HttpResponseCode"

import { logger } from "../library/logger"

export const notificationSchema = z.object({
    title: z.string().default("System"),
    body: z.string(),
})

export class HttpNotificationController {
    private notificationUsecase: NotificationUsecase
    private authUsecase: AuthUseCase
    
    constructor(notificationUsecase: NotificationUsecase, authUsecase: AuthUseCase) {
        this.notificationUsecase = notificationUsecase
        this.authUsecase = authUsecase
    }

    async notify(request: Request, response: Response) {
        try {
            const data = notificationSchema.parse(request.body)
            const profile = await this.authUsecase.getProfile(request.headers.authorization)

            const notification = await this.notificationUsecase.notify(profile.id, data.title, data.body)

            return response.status(HttpResponseCode.Created).json({
                code: "created",
                notification,
            })
        } catch (error: any) {
            if (isZodError(error)) {
                return response.status(HttpResponseCode.BadRequest).json({
                    code: "bad_request",
                    message: "Bad Request"
                })
            }

            if (isAuthError(error)) {
                return response.status(HttpResponseCode.Unauthorized).json({
                    code: error.code,
                    message: error.message
                })
            }

            logger.error(`Unhandled error: `, error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message
            })
        }
    }

    async getNotifications(request: Request, response: Response) {
        try {
            const profile = await this.authUsecase.getProfile(
                request.headers.authorization
            )
            const notifications = await this.notificationUsecase.getNotifications(profile.id)

            return response.status(HttpResponseCode.Found).json({
                code: "found",
                notifications,
            })
        } catch (error: any) {
            if (isAuthError(error)) {
                return response.status(HttpResponseCode.Unauthorized).json({
                    code: error.code,
                    message: error.message
                })
            }

            logger.error(`Unhandled error: `, error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message
            })
        }
    }
}