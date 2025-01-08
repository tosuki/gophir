import { DatabaseProvider } from "../../provider/DatabaseProvider"

import type { User } from "src/model/User";
import type { UserRepository } from "./UserRepository"

export class UserRepositoryImpl implements UserRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    getByUsername(username: string): Promise<User | null> {
        return this.databaseProvider.findFirst<User>("users", { username })
    }

    save(username: string, password: string): Promise<User> {
        return this.databaseProvider.save<User>("users", { username, password })
    }
}
