import type { DatabaseProvider } from "../provider/DatabaseProvider"
import type { UserRepository } from "../repositories/user/UserRepository"
import type { MessageRepository } from "../repositories/message/MessageRepository";
import type { NotificationRepository } from "../repositories/notification/NotificationRepository"
import type { ProfileRepository } from "../repositories/profile/ProfileRepository"

import { UserRepositoryImpl } from "../repositories/user/UserRepositoryImpl";
import { MessageRepositoryImpl } from "../repositories/message/MessageRepositoryImpl";
import { NotificationRepositoryImpl } from "../repositories/notification/NotificationRepositoryImpl"
import { ProfileRepositoryImpl } from "../repositories/profile/ProfileRepositoryImpl"

export function createUserRepository(databaseProvider: DatabaseProvider): UserRepository {
    return new UserRepositoryImpl(databaseProvider)
}

export function createProfileRepository(databaseProvider: DatabaseProvider): ProfileRepository {
    return new ProfileRepositoryImpl(databaseProvider)
}

export function createNotificationRepository(databaseProvider: DatabaseProvider): NotificationRepository {
    return new NotificationRepositoryImpl(databaseProvider)
}

export function createMessageRepository(databaseProvider: DatabaseProvider): MessageRepository {
    return new MessageRepositoryImpl(databaseProvider)
}
