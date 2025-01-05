import { PartialSession } from "./PartialSession"

export type Session = PartialSession & {
    expiresAt: number
    updatedAt: number
}
