import { Knex } from "knex"; 

import type { User } from "src/model/User";
import type { UserRepository } from "./UserRepository"

export class UserRepositoryImpl implements UserRepository {
    private queryBuilder: Knex
    
    constructor(queryBuilder: Knex) {
        this.queryBuilder = queryBuilder
    }

    async getByUsername(username: string): Promise<User | null> {
        throw new Error("to-do")
    }

    async save(username: string, password: string): Promise<User> {
        throw new Error("to-do")
    }
}
