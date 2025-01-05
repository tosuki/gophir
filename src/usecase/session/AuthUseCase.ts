import { UserRepository } from "../../repositories/user/UserRepository"

import type { PassportEncoder } from "./JwtEncoder"
import type { EncryptProvider } from "../../provider/EncryptProvider"

export class AuthUseCase {
    private userRepository: UserRepository
    private passportEncoder: PassportEncoder

    constructor(
        userRepository: UserRepository,
        passportEncoder: PassportEncoder,
        encryptProvider: EncryptProvider,
    ) {
        this.userRepository = userRepository        
    }

    async authenticate(username: string, password: string) {
        try {
        } catch (error: any) {

        }
    }
}