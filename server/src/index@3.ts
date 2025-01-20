import "make-promises-safe"

import configurations from "../knexfile"
import * as knex from "knex"
import { createDatabaseProvider } from "./factory/provider"
import { 
    createMessageRepository,
    createUserRepository,
    createProfileRepository,
    createNotificationRepository
} from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"
import { ChatUseCase } from "./usecase/chat/ChatUseCase"

import environment from "./env"
import { logger } from "./library/logger"

import { NotificationUsecase } from "./usecase/notification/NotificationUsecase"

import type { Profile } from "./model/Profile"

const databaseProvider = createDatabaseProvider()

const messageRepository = createMessageRepository(databaseProvider)
const userRepository = createUserRepository(databaseProvider)
const notificationRepository = createNotificationRepository(databaseProvider)
const profileRepository = createProfileRepository(databaseProvider)

const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)
const chatUseCase = new ChatUseCase(authUseCase, messageRepository)
const notificationUsecase = new NotificationUsecase(notificationRepository, authUseCase)

const queryBuilder = knex(configurations)

async function main() {
    const user = await userRepository.getByUsername("admin")
    
    if (!user) {
        return logger.error("Admin doesn't exist")
    }
        
    console.log(user)
    const profile = await profileRepository.getByAuthorId(user.id)    
    if (!profile) {
        return logger.error("Profile doesnt exist")
    }

    /**const newProfile = await profileRepository.editProfile(user.id, {
        description: "hello world"
    })**/
    const newProfile = await profileRepository.editProfile(user.id, {
        description: "hello world@2"
    })
    //const result = await queryBuilder.raw(`UPDATE profile SET description = 'Hello World' WHERE "authorId" = ${user.id} RETURNING *;`)

    console.log(newProfile)
}

main().then(console.log)
    .catch(console.log)
    .finally(() => {
        databaseProvider.disconnect()
    })
