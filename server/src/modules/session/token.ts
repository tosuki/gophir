import { encode, decode } from "jwt-simple"
import { logger } from "../../logger"

import { PartialSession } from "./PartialSession"
import { Session } from "./Session"
import { Result } from "../../lib/result"

import environment from "../../env"

export function encodeSession(partialSession: PartialSession): Result<string> {
    const issuedAt = Date.now()
    const expiresAt = issuedAt + (60*60 * environment.TOKEN_EXPIRATION)

    const token = encode({
        expiresAt,
        issuedAt,
        ...partialSession
    }, environment.JWT_SECRET, "HS256")

    return { data: token }
}

export function decodeSession(token: string): Result<Session> {
    try {
        return { data: decode(token, environment.JWT_SECRET, false, "HS256")}
    } catch (err: any) {
        switch (err.code) {
            case "Not enough or too many segments":
            case "Algorithm not supported":
            case "Signature verification failed":
                logger.error(`Failed to decode the token due to ${err.code}`)
                return { error: "invalid_token" }
            case "Token expired":
                return { error: "expired_token" }
            default:
                return { error: "unhandled" }
        }
    }
}
