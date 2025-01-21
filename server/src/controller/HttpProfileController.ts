import { Request, Response } from "express"

import { ProfileUsecase } from "../usecase/session/ProfileUsecase"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"

import { isAuthError } from "../library/error/AuthError"
import { logger } from "../library/logger"

export class HttpProfileController {
    private profileUsecase: ProfileUsecase
    private authUsecase: AuthUseCase

    constructor(profileUsecase: ProfileUsecase, authUsecase: AuthUseCase) {
        this.profileUsecase = profileUsecase
        this.authUsecase = authUsecase
    }
    
    async setProfile(request: Request, response: Response) {
        try {

        } catch (error: any) {}
    }
     
    async getProfile(request: Request, response: Response) {
        try {
            const profile = await this.profileUsecase.getProfile(request.params.username)

            return response.status(HttpResponseCode.Ok).json({
                code: "found",
                profile
            })
        } catch (error: any) {
            logger.error(error)
            return response.status(HttpResponseCode.InternalServerError).json({
                code: error.code,
                message: error.message,
            }) 
        }
    }

}
