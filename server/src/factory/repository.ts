import type { DatabaseProvider } from "../provider/DatabaseProvider"
import type { UserRepository } from "../repositories/user/UserRepository"
import type { MessageRepository } from "../repositories/message/MessageRepository";

import { UserRepositoryImpl } from "../repositories/user/UserRepositoryImpl";
import { MessageRepositoryImpl } from "../repositories/message/MessageRepositoryImpl";

export function createUserRepository(databaseProvider: DatabaseProvider): UserRepository {
    return new UserRepositoryImpl(databaseProvider)
}

export function createMessageRepository(databaseProvider: DatabaseProvider): MessageRepository {
    return new MessageRepositoryImpl(databaseProvider)
}
