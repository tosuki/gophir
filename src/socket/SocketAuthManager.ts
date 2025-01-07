import { Socket, NextFunction } from "socket.io"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { logger } from "../library/logger"
import { isAuthError } from "src/library/error/AuthError"

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
            const profile = await this.authUsecase.getProfile(socket.handshake.auth.passport)

            socket.session = profile
        } catch (error: any) {
            if (isAuthError(error) && (
                error.code === "invalid_token" ||
                error.code === "expired_token"
            )) {
                logger.debug(`Refused connection from ${socket.handshake.address} because of ${error.code}`)
                return next(new Error(error.code))
            }

            next(new Error("internal_server_error"))
        }
    }
}