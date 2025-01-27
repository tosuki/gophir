import { User } from "./user"

export type Profile = {
    description: string
    author: Omit<User, "password">
}
