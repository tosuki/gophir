import { Knex } from "knex"; 

import type { User } from "src/model/User";
import type { UserRepository } from "./UserRepository"

export class UserRepositoryImpl implements UserRepository {
    private queryBuilder: Knex
    
    constructor(queryBuilder: Knex) {
        this.queryBuilder = queryBuilder
    }

    async getByUsername(username: string): Promise<User | null> {
        return this.queryBuilder("users")
            .where({ username })
            .first()
    }

    async save(username: string, password: string): Promise<User> {
        return this.queryBuilder("users")
            .returning(["id", "username", "password", "createdAt"])
            .insert({
                username,
                password,
                createdAt: Date.now(),
            })
    }
}
