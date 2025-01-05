import type { User } from "../../model/User"

export interface UserRepository {
    save(username: string, passsword: string): Promise<User>
    getByUsername(username: string): Promise<User | null>
}