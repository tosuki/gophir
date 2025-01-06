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

authUseCase.authenticate("admin@4", "123")
    .then((passport) => {
        authUseCase.getProfile(passport)
            .then((profile) => {
                console.log("The profile is:", profile)
            }).catch((error: any) => {
                console.log(error)
            })
    })
    .catch((error) => {
        console.log(error)
    })
