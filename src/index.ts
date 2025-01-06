import "make-promises-safe"

import { createDatabaseProvider } from "./factory/provider"
import { createMessageRepository, createUserRepository } from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"
import type { MessageRepository } from "./repositories/message/MessageRepository"

const databaseProvider = createDatabaseProvider()

const messageRepository = createMessageRepository(databaseProvider)
const userRepository = createUserRepository(databaseProvider)
const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)

async function runQueries(authUsecase: AuthUseCase, messageRepository: MessageRepository) {
    const user = await userRepository.save("hello", "123")

    console.log(user)
}

runQueries(authUseCase, messageRepository)
    .then(() => {
        databaseProvider.disconnect()
    })
    .catch((error: any) => {
        console.log(error)
        databaseProvider.disconnect()
    })