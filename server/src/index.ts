import "make-promises-safe"

import { createDatabaseProvider } from "./factory/provider"
import { createMessageRepository, createNotificationRepository, createUserRepository } from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"
import { ChatUseCase } from "./usecase/chat/ChatUseCase"

import { createServer } from "./http/server"
import { createSocketServer } from "./factory/socket"

import environment from "./env"
import { logger } from "./library/logger"
import { NotificationUsecase } from "./usecase/notification/NotificationUsecase"

const databaseProvider = createDatabaseProvider()

const messageRepository = createMessageRepository(databaseProvider)
const userRepository = createUserRepository(databaseProvider)
const notificationRepository = createNotificationRepository(databaseProvider)
const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)
const chatUseCase = new ChatUseCase(authUseCase, messageRepository)
const notificationUsecase = new NotificationUsecase(notificationRepository, authUseCase)

async function main() {
    const passport = await authUseCase.authenticate("admin", "123")
    const profile = await authUseCase.getProfile(passport)
    
    const notifications = await notificationUsecase.notify(profile.id, "System", "sei lá porra")

    // console.log(notifications)
}

notificationUsecase.onNotification((notification) => {
    console.log(notification)
})

main().catch((error) => console.log(error)).finally(() => {
    databaseProvider.disconnect()
})
