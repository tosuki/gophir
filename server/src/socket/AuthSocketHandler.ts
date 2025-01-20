import { Socket, NextFunction } from "socket.io"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { logger } from "../library/logger"
import { isAuthError } from "../library/error/AuthError"

export class AuthSocketHandler {
    private authUsecase: AuthUseCase

    constructor(authUsecase: AuthUseCase) {
        this.authUsecase = authUsecase
    }

    async handle(socket: Socket, next: NextFunction) {
        if (!socket.handshake.auth.passport) {
            logger.debug(`Refused connection from ${socket.handshake.address} because of lack of passport`)
            return next(new Error("invalid_passport"))
        }

        try {
            socket.session = await this.authUsecase.getSession(socket.handshake.auth.passport)
            next()
        } catch (error: any) {
            if (isAuthError(error) && (
                error.code === "invalid_token" ||
                error.code === "expired_token"
            )) {
                console.log(`The passport is ${socket.handshake.auth.passport} and the result of the check is: `, error)
                logger.debug(`Refused connection from ${socket.handshake.address} because of ${error.code}`)
                return next(new Error(error.code))
            }

            next(new Error("internal_server_error"))
        }
    }
}
