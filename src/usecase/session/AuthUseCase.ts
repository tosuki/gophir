import { UserRepository } from "../../repositories/user/UserRepository"

import type { PassportEncoder } from "./JwtEncoder"
import type { EncryptProvider } from "../../provider/EncryptProvider"

import { AuthError } from "../../library/error/AuthError"
import { isCriticalError } from "../../library/error/CriticalError"

import { logger } from "../../logger"

export class AuthUseCase {
    private userRepository: UserRepository
    private passportEncoder: PassportEncoder
    private encryptProvider: EncryptProvider

    constructor(
        userRepository: UserRepository,
        passportEncoder: PassportEncoder,
        encryptProvider: EncryptProvider,
    ) {
        this.userRepository = userRepository
        this.passportEncoder = passportEncoder
        this.encryptProvider = encryptProvider  
    }

    async authenticate(username: string, password: string): Promise<string> {
        try {
            const user = await this.userRepository.getByUsername(username)
            
            if (!user) {
                throw new AuthError("invalid_username", `${username} doesn't exist in our database`)
            }

            const isPasswordValid = await this.encryptProvider.compare(password, user.password)

            if (!isPasswordValid) {
                throw new AuthError("invalid_password", "The password given doesn't match with the user password") 
            }

            return this.passportEncoder.encodeSession({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
            })
        } catch (error: any) {
            if (isCriticalError(error)) {
                switch (error.code) {
                    case "database_error":
                        logger.error(`[Database Error] ${error.message}`, error.cause)
                        break
                    case "encrypt_error":
                        logger.error(`[Encrypt error] Error during the encryption process`, error.cause)
                        break
                    default:
                        logger.error(`[Unhandled] An unhandled error during the authentication process`, error.cause)
                        break
                }
            }

            throw error
        }
    }
}