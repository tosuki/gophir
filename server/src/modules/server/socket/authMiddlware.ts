import { Socket, ExtendedError } from "socket.io"

import { decodeSession } from "../../session/token"
import { logger } from "../../../logger"

export function authMiddlware(socket: Socket, next: (error?: ExtendedError) => void) {
    const passport = socket.handshake.auth.token

    if (!passport) {
        logger.error(`${socket.id} attempted to connect, but failed due to lack of passport`)
        return next(new Error("unauthorized"))
    }

    const decoded = decodeSession(passport)

    if (!decoded.error) {
        socket.session = decoded.data
        return next()
    }

    logger.error(`Refused connection of ${socket.id} due to ${decoded.error}`)
    return next(new Error(decoded.error))
}