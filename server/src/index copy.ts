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
const notificationUsecase = new NotificationUsecase(notificationRepository, authUseCase)
const chatUseCase = new ChatUseCase(authUseCase, messageRepository)

const server = createServer(chatUseCase)
const socket = createSocketServer(server, chatUseCase)

process.on("beforeExit", async () => {
    await socket.disconnect()
    await databaseProvider.disconnect()

    process.exit(0)
})

server.listen(environment.PORT, () => {
    logger.info(`Listening on port ${environment.PORT}`)
})
