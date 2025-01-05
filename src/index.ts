import "make-promises-safe"

import { createDatabase } from "./provider/database"
import { createUserRepository } from "./factory/repository"
import { createEncryptProvider, createPassportEncoder } from "./factory/provider"
import { AuthUseCase } from "./usecase/session/AuthUseCase"

const queryBuilder = createDatabase()
const userRepository = createUserRepository(queryBuilder)
const passportEncoder = createPassportEncoder()
const encryptProvider = createEncryptProvider()

const authUseCase = new AuthUseCase(userRepository, passportEncoder, encryptProvider)

authUseCase.register("a", "b")
    .catch((error) => {
        console.log(error)
    })
