import { User } from "./User"

export type Session = Omit<User, "passwword"> & {
    issuedAt: number
    updatedAt: number
}
