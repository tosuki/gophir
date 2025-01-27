import { Request, Response } from "express"

import { ProfileUsecase } from "../usecase/session/ProfileUsecase"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"

import { isProfileError } from "../library/error/ProfileError"
import { isZodError } from "../library/error/ZodError"
import { isAuthError } from "../library/error/AuthError"
import { logger } from "../library/logger"

import { z } from "zod"

const profileSchema = z.object({
    description: z.string()
})

export class HttpProfileController {
    private profileUsecase: ProfileUsecase
    private authUsecase: AuthUseCase

    constructor(profileUsecase: ProfileUsecase, authUsecase: AuthUseCase) {
        this.profileUsecase = profileUsecase
        this.authUsecase = authUsecase
    }
    
    async setProfile(request: Request, response: Response) {
        try {
            const session = await this.authUsecase.getSession(request.headers.authorization)
            
            if (!request.body.description) {
                return response.status(HttpResponseCode.BadRequest).json({
                    code: "bad_request",
                    message: "Missing new profile information"
                })
            }

            const profile = await this.profileUsecase.setProfile(session.id, request.body.description)
            
            return response.status(HttpResponseCode.Created).json({
                code: "created",
                profile,
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
            
            if (isProfileError(error) && (
                error.code === "invalid_profile"
            )) {
                return response.status(HttpResponseCode.NotFound).json({
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

    async createProfile(request: Request, response: Response) {
        try {
            const data = profileSchema.parse(request.body)
            const session = await this.authUsecase.getSession(request.headers.authorization)
            const profile = await this.profileUsecase.createProfile(session.id, data.description)

            return response.status(HttpResponseCode.Created).json({
                code: "created",
                profile,
               
            })
        } catch (error: any) {
            if (isAuthError(error)) {
                return response.status(HttpResponseCode.Unauthorized).json({
                    code: error.code,
                    message: error.message,
                })
            }

            if (isZodError(error)) {
                return response.status(HttpResponseCode.BadRequest).json({
                    code: "bad_request",
                    message: "Bad Request",
                })
            }

            if (isProfileError(error) && error.code === "invalid_session") {
                return response.status(HttpResponseCode.NotFound).json({
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
     
    async getProfile(request: Request, response: Response) {
        try {
            const profile = await this.profileUsecase.getProfile(request.params.username)

            return response.status(HttpResponseCode.Ok).json({
                code: "found",
                profile
            })
        } catch (error: any) {
            if (isProfileError(error)) {
                return response.status(HttpResponseCode.NotFound).json({
                    code: error.code,
                    message: error.message,
                })
            }

            logger.error(error.cause)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message,
            }) 
        }
    }

}
