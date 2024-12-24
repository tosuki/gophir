import { Request, Response, NextFunction } from "express"

import { AuthUsecase } from "../../../session/AuthUsecase"
import { isZodError, AuthenticateSchema } from "./Schemas"
import { logger } from "../../../../logger"

import {
    UNAUTHORIZED,
    ACCEPTED,
    BAD_REQUEST,
    CONFLICT,
    INTERNAL_SERVER_ERROR
} from "../../util/codes"

export class AuthHttpController {
    constructor(
        private authUsecase: AuthUsecase
    ) {}

    private handleUnhandledError(error: any, response: Response) {
        logger.error(`Unhandled error ${error}`)
        response.status(INTERNAL_SERVER_ERROR).json({
            ok: false,
            error: "internal_server_error"
        })
    }

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

    public async authenticate(request: Request, response: Response) {
        try {
            const data = AuthenticateSchema.parse(request.body)

            const token = await this.authUsecase.authenticate(data.username, data.password)

            if (!token.error) {
                response.status(ACCEPTED).json({
                    ok: true,
                    data: token.data,
                })
                return
            }

            if (token.error === "invalid_password" || token.error === "invalid_username") {
                response.status(UNAUTHORIZED).json({
                    ok: false,
                    error: token.error,
                })
            } else {
                logger.error(`Unhandled error ${token.error}`)
                response.status(INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    error: "unhandled"
                })
            }
        } catch (err) {
            if (isZodError(err)) {
                return response.status(BAD_REQUEST).json({
                    ok: false,
                    data: "bad_request"
                })
            }
        }
    }

    public async register(request: Request, response: Response) {
        try {
            const data = AuthenticateSchema.parse(request.body)

            const token = await this.authUsecase.register(data.username, data.password)

            if (!token.error) {
                response.status(ACCEPTED).json({
                    ok: true,
                    data: token.data,
                })
                return
            }

            switch (token.error) {
                case "occupied":
                    response.status(CONFLICT).json({
                        ok: false,
                        error: "conflict"
                    })
                    break
                case "database_error":
                    response.status(INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        error: "internal_server_error"
                    })
                default:
                    this.handleUnhandledError(token.error, response)
            }
        } catch (err) {
            if (isZodError(err)) {
                response.status(BAD_REQUEST).json({
                    ok: false,
                    error: "bad_request"
                })
                return
            }

            this.handleUnhandledError(err, response)
        }
    }
}