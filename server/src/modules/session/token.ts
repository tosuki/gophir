import { encode, decode } from "jwt-simple"
import { logger } from "../../logger"

import { PartialSession } from "./PartialSession"
import { Session } from "./Session"
import { Result } from "../../lib/result"

import environment from "../../env"

export type EncodedSession = {
    token: string
    issuedAt: number
    expiresAt: number
}

export function renewSession(session: Session): Result<{ session: Session, token: string }> {
    const encoded = encodeSession({
        id: session.id,
        username: session.username,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
    })

    if (encoded.error) {
        return { error: encoded.error }
    }

    return {
        data: {
            session: {
                id: session.id,
                username: session.username,
                createdAt: session.createdAt,
                updatedAt: session.updatedAt,
                expiresAt: encoded.data.expiresAt,
                issuedAt: encoded.data.issuedAt,
            },
            token: encoded.data.token
        }
    }
}

export function encodeSession(partialSession: PartialSession): Result<{ token: string, issuedAt: number, expiresAt: number }> {
    const issuedAt = Date.now()
    const expiresAt = issuedAt + (60*60*1000 * environment.TOKEN_EXPIRATION)

    const token = encode({
        expiresAt,
        issuedAt,
        ...partialSession
    }, environment.JWT_SECRET, "HS256")

    return { data: { token, issuedAt, expiresAt } }
}

export function decodeSession(token: string): Result<Session> {
    try {
        return { data: decode(token, environment.JWT_SECRET, false, "HS256")}
    } catch (err: any) {
        switch (err.message) {
            case "Not enough or too many segments":
            case "Algorithm not supported":
            case "No token supplied":
            case "Signature verification failed":
                logger.error(`Failed to decode the token due to ${err.code}`)
                return { error: "invalid_token" }
            case "Token expired":
                return { error: "expired_token" }
            default:
                if (err.message.indexOf("Unexpected token") === 0) {
                    return { error: "invalid_token" }
                }

                return { error: "unhandled" }
        }
    }
}

export type ExpirationStatus =
    | "active"
    | "expired"
    | "renew"

export function checkSessionExpiration(session: Session): ExpirationStatus {
    const now = Date.now()

    if (session.expiresAt > now) {
        return "active"
    }

    if (session.expiresAt + (60*60*1000 * environment.TOKEN_GRACE_PERIOD) > now) {
        return "renew"
    }
    
    return "expired"
}
