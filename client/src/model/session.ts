import { User } from "./user"

export type PartialSession = Omit<User, "password">
export type Session = PartialSession & {
    issuedAt: number
    expiresAt: number
}
