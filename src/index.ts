import "make-promises-safe"

import { createDatabaseProvider } from "./factory/provider"
import { createMessageRepository, createUserRepository } from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"
import type { MessageRepository } from "./repositories/message/MessageRepository"
import { ChatUseCase } from "./usecase/chat/ChatUseCase"

const databaseProvider = createDatabaseProvider()

const messageRepository = createMessageRepository(databaseProvider)
const userRepository = createUserRepository(databaseProvider)
const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)
const chatUseCase = new ChatUseCase(authUseCase, messageRepository)

async function runQueries(chatUsecase: ChatUseCase) {
    const passport = await chatUseCase.auth.authenticate("admin", "123")
    const message = await chatUsecase.sendMessage("hello world", passport)

    console.log(message)
}

runQueries(chatUseCase)
    .then(() => {
        databaseProvider.disconnect()
    })
    .catch((error: any) => {
        console.log(error)
        databaseProvider.disconnect()
    })