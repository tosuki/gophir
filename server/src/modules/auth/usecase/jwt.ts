import { Result } from "src/lib/result";
import { Session } from "../model/Session"

export function encodeSession (session: Session): Result<string> {
    return { error: "to-do" }
}

export function decodeSession (token: string): Result<Session> {
    return { error: "to-do" }
}

export type TokenExpirationStatus =
    | "expired"
    | "active"
    | "renew"

export function checkExpiration (session: Session): Result<TokenExpirationStatus> {
    return { data: "expired" }
}
