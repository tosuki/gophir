import { User } from "./User"

export type Profile = {
    profileId: number
    authorId: number
    description: string
    author: Omit<User, "password">
}

