import { User } from "./User"

export type PartialSession = Omit<User, "password">