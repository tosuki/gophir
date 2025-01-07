import "make-promises-safe"

import { createDatabaseProvider } from "./factory/provider"
import { createMessageRepository, createUserRepository } from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"
import { ChatUseCase } from "./usecase/chat/ChatUseCase"

import { createServer } from "./http/server"

import environment from "./env"
import { logger } from "./library/logger"

const databaseProvider = createDatabaseProvider()

const messageRepository = createMessageRepository(databaseProvider)
const userRepository = createUserRepository(databaseProvider)
const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)
const chatUseCase = new ChatUseCase(authUseCase, messageRepository)

const server = createServer(chatUseCase)

process.on("exit", () => {
    databaseProvider.disconnect()
})

server.listen(environment.PORT, () => {
    logger.info(`Listening on port ${environment.PORT}`)
})