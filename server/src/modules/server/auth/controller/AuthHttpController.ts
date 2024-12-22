import { Request, Response, NextFunction } from "express"
import { AuthUsecase } from "../../../session/AuthUsecase"
import { UNAUTHORIZED } from "../../util/codes"

export class AuthHttpController {
    constructor(
        private authUsecase: AuthUsecase
    ) {}

    public middlware(request: Request, response: Response, next: NextFunction) {
        const passport = request.headers.authorization

        if (!passport) {
            response.status(UNAUTHORIZED).json({
                ok: false,
                error: "bad_request"
            })

            return
        }

        next()
    }

    public authenticate(request: Request, response: Response) {
        
    }
}