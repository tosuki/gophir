import { Request, Response } from "express"

import { ProfileUsecase } from "../usecase/session/ProfileUsecase"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"

export class HttpProfileController {
    private profileUsecase: ProfileUsecase
    private authUsecase: AuthUseCase

    constructor(profileUsecase: ProfileUsecase, authUsecase: AuthUseCase) {
        this.profileUsecase = profileUsecase
        this.authUsecase = authUsecase
    }
    
    getProfile(request: Request, response: Response) {
        response.status(HttpResponseCode.Ok).json({
            message: "hello world"
        })
    }

}
