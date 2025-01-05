import { Knex } from "knex"; 

import type { User } from "src/model/User";
import type { UserRepository } from "./UserRepository"

import { CriticalError } from "../../library/error/CriticalError"

export class UserRepositoryImpl implements UserRepository {
    private queryBuilder: Knex
    
    constructor(queryBuilder: Knex) {
        this.queryBuilder = queryBuilder
    }

    async getByUsername(username: string): Promise<User | null> {
        try {
            return this.queryBuilder("users")
                .where({ username })
                .first()
        } catch (error: any) {
            throw new CriticalError("database_error", error.message, error)
        }
    }

    async save(username: string, password: string): Promise<User> {
        try {
            return this.queryBuilder("users")
                .returning(["id", "username", "password", "createdAt"])
                .insert({
                    username,
                    password,
                    createdAt: new Date().toISOString()
                })
        } catch (error: any) {
            throw new CriticalError("database_error", error.message, error)
        }
    }
}
