import { User } from "./User"

export type Session = Omit<User, "password"> & {
    socketId: string

    issuedAt: number
    expiresAt: number
}
