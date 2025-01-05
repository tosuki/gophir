import type { Knex } from "knex";
import type { UserRepository } from "../repositories/user/UserRepository"
import type { MessageRepository } from "../repositories/message/MessageRepository";

import { UserRepositoryImpl } from "../repositories/user/UserRepositoryImpl";
import { MessageRepositoryImpl } from "../repositories/message/MessageRepositoryImpl";

export function createUserRepository(knex: Knex): UserRepository {
    return new UserRepositoryImpl(knex)
}

export function createMessageRepository(knex: Knex): MessageRepository {
    return new MessageRepositoryImpl(knex)
}
