import { UserRepository } from "../../repositories/user/UserRepository"

import type { PassportEncoder } from "./JwtEncoder"
import type { EncryptProvider } from "../../provider/EncryptProvider"

import type { Session } from "../../model/Session"

import { AuthError } from "../../library/error/AuthError"

import { isDatabaseError } from "../../library/error/DatabaseError"
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
            const hashed = await this.encryptProvider.encrypt(password)
            const user = await this.userRepository.save(username, hashed)

            return this.passportEncoder.encodeSession({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            })
        } catch (error: any) {
            if (isDatabaseError(error) && error.code === "unique_constraint") {
                throw new AuthError("username_occupied", "There is already an user using this username")
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

    async getProfile(passport: string): Promise<Session> {
        try {
            const decoded = this.passportEncoder.decodeSession(passport)
            const user = await this.userRepository.getByUsername(decoded.username)

            if (!user) {
                throw new AuthError("invalid_token", "The session encoded in the token is invalid")
            }

            return {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt,
                expiresAt: decoded.expiresAt,
                issuedAt: decoded.issuedAt
            }
        } catch (error: any) {
            if (isCriticalError(error)) {
                handleCriticalError(error)
            }
            throw error
        }
    }
}
