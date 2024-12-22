import { PartialSession } from "./PartialSession"

export type Session = PartialSession & {
    issuedAt: number
    expiresAt: number
}
