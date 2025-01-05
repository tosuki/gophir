import { UserRepository } from "../../repositories/user/UserRepository"

import type { PassportEncoder } from "./JwtEncoder"
import type { EncryptProvider } from "../../provider/EncryptProvider"

import { AuthError } from "../../library/error/AuthError"
import { isCriticalError } from "../../library/error/CriticalError"

import { handleCriticalError } from "../../library/utils"

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

    async register(username: string, password: string): Promise<string> {
        try {
            const conflict = await this.userRepository.getByUsername(username)

            if (conflict) {
                throw new AuthError("username_occupied", "There is already an user using this username")
            }

            const hashed = await this.encryptProvider.encrypt(password)
            const user = await this.userRepository.save(username, hashed)

            return this.passportEncoder.encodeSession({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            })
        } catch (error: any) {
            if (isCriticalError(error)) {
                handleCriticalError(error)
            }

            throw error
        }
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
                handleCriticalError(error)
            }

            throw error
        }
    }
}