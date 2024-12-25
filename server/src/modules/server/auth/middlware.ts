import { Socket, ExtendedError } from "socket.io"
import { Request, Response, NextFunction } from "express"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../util/codes"

import { logger } from "../../../logger"

import { checkSessionExpiration, decodeSession, renewSession } from "../../session/token"

export function httpAuthMiddlware(request: Request, response: Response, next: NextFunction): any {
    const passport = request.headers.authorization

    if (!passport) {
        return response.status(BAD_REQUEST).json({
            ok: false,
            error: "bad_request"
        })
    }

    const decoded = decodeSession(passport)

    if (decoded.error) {
        logger.error(`Refused request from ${request.hostname} due to ${decoded.error}`)
        return response.status(UNAUTHORIZED).json({
            ok: false,
            error: "unauthorized"
        })
    }

    switch (checkSessionExpiration(decoded.data)) {
        case "active":
            next()
            break
        case "expired":
            return response.status(UNAUTHORIZED).json({
                ok: false,
                error: "expired_token"
            })
        case "renew":
            const renewed = renewSession(decoded.data)

            if (renewed.error) {
                logger.error(`Failed to renew the session due to ${renewed}`)
                return response.status(INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    error: "internal_server_error"
                })
            }

            response.setHeader("Renew-Authorization", renewed.data.token)
            response.locals.session = renewed.data.session
            break
    }

    next()
}

export function socketAuthMiddlware(socket: Socket, next: (error?: ExtendedError) => void) {
    const passport = socket.handshake.auth.passport

    if (!passport) {
        logger.error(`Refused connection from ${socket.id} due to lack of passport`)
        return next(new Error("bad_request"))
    }

    const decoded = decodeSession(passport)

    if (!decoded.error) {
        socket.session = passport
        return next()
    }

    logger.error(`Refused connection of ${socket.id} due to ${decoded.error}`)
    next(new Error(decoded.error))
}
