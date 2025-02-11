import type { PartialSession } from "../../model/PartialSession"
import type { Session } from "../../model/Session"

import { encode, decode, type TAlgorithm } from "jwt-simple"
import { z } from "zod"

import { AuthError } from "../../library/error/AuthError"
import { isZodError } from "../../library/error/ZodError"

export interface PassportEncoder {
    encodeSession(partialSession: PartialSession): string
    decodeSession(passport: string): Session
}


const sessionSchema = z.object({
    username: z.string(),
    issuedAt: z.number(),
    expiresAt: z.number()
})

export class JWTEncoder implements PassportEncoder {
    private secret: string
    private expirationTime: number

    public algorithm: TAlgorithm

    constructor(secret: string, expirationTime: number, algorithm?: TAlgorithm) {
        this.secret = secret
        this.expirationTime = expirationTime
        this.algorithm = algorithm || "HS512"
    }

    encodeSession(partialSession: PartialSession, expirationTime?: number): string {
        const issuedAt = Date.now()
        const expiresAt = issuedAt + (expirationTime || this.expirationTime)

        const token = encode({
            ...partialSession,
            issuedAt, expiresAt
        }, this.secret, this.algorithm)

        return token
    }

    decodeSession(passport: string): Session {
        try {
            const decoded = decode(passport, this.secret, false, this.algorithm)
            const session = sessionSchema.parse(decoded)

            return session as Session
        } catch (error: any) {
            switch (error.message) {
                case "Not enough or too many segments":
                case "Algorithm not supported":
                case "No token supplied":
                case "Signature verification failed":
                    throw new AuthError("invalid_token", error.message, error)
                case "Token expired":
                    throw new AuthError("expired_token", "Expired token", error)
                default:
                    if (error.message.indexOf("Unexpected token") === 0) {
                        throw new AuthError("invalid_token", error.message, error)
                    }

                    if (isZodError(error)) {
                        throw new AuthError("invalid_token", "wrong payload structure")
                    }

                    throw error
            }
        }
    }

}
