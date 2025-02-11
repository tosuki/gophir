import type { Request, Response } from "express"

import { AuthUseCase } from "../usecase/session/AuthUseCase"
import { NotificationUsecase } from "../usecase/notification/NotificationUsecase"
import { HttpResponseCode } from "../library/http/HttpResponseCode"

import { z } from "zod"
import { logger } from "../library/logger"

import { isZodError } from "../library/error/ZodError"
import { isAuthError } from "../library/error/AuthError"

export const authenticationSchema = z.object({
    username: z.string(),
    password: z.string()
})

export class HttpAuthController {
    private authUsecase: AuthUseCase
    private notificationUsecase: NotificationUsecase

    constructor(authUsecase: AuthUseCase, notificationUsecase: NotificationUsecase) {
        this.authUsecase = authUsecase
    }

    async getSession(request: Request, response: Response): Promise<unknown> {
        try {
            if (!request.headers.authorization) {
                return response.status(HttpResponseCode.Unauthorized).json({
                    code: "unauthorized",
                    message: "Missing passport"
                })
            }

            const profile = await this.authUsecase.getSession(request.headers.authorization)

            return response.status(HttpResponseCode.Ok).json({
                code: "found",
                session: profile,
            })
        } catch (error: any) {
            if (isAuthError(error) && (
                error.code === "invalid_token" ||
                error.code === "expired_token"
            )) {
               return response.status(HttpResponseCode.Unauthorized).json({
                    code: error.code,
                    message: error.message
               })
            }

            logger.error(error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message,
            })
        }
    }

    async authenticate(request: Request, response: Response): Promise<unknown> {
        try {
            const { username, password } = authenticationSchema.parse(request.body)
            const passport = await this.authUsecase.authenticate(username, password)

            return response.status(HttpResponseCode.Accepted).json({
                code: "accepted",
                passport,
            })
        } catch (error: any) {
            if (isZodError(error)) {
                return response.status(HttpResponseCode.BadRequest).json({
                    code: "bad_request",
                    message: "Bad Request"
                })
            }

            if (isAuthError(error) && (
                error.code === "invalid_password" ||
                error.code === "invalid_username"
            )) {
                return response.status(HttpResponseCode.Unauthorized).json({
                    code: error.code,
                    message: error.message
                })
            }

            logger.error(error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message,
            })
        }
    }

    async register(request: Request, response: Response): Promise<unknown> {
        try {
            const { username, password } = authenticationSchema.parse(request.body)

            const passport = await this.authUsecase.register(username, password)

            return response.status(HttpResponseCode.Created).json({
                code: "created",
                passport
            })
        } catch (error: any) {
            if (isZodError(error)) {
                return response.status(HttpResponseCode.BadRequest).json({
                    code: "bad_request",
                    message: "bad_request"
                })
            }

            if (isAuthError(error) && error.code === "username_occupied") {
                return response.status(HttpResponseCode.Conflict).json({
                    code: error.code,
                    message: error.message,
                })
            }

            logger.error(error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message,
            })
        }
    }
}
