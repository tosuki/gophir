import { CriticalError } from "../library/error/CriticalError"
import { hash, compare } from "bcrypt"

export interface EncryptProvider {
    encrypt(value: string): Promise<string>
    compare(value: string, encrypted: string): Promise<boolean>
}

export class BCryptEncryptProvider implements EncryptProvider {
    private saltRounds: number = 10

    encrypt(value: string): Promise<string> {
        try {
            return hash(value, this.saltRounds)
        } catch (error: any) {
            throw new CriticalError("encrypt_error", "Failed to encrypt the value", error)
        }
    }

    compare(value: string, encrypted: string): Promise<boolean> {
        try {
            return compare(value, encrypted)
        } catch (error: any) {
            throw new CriticalError("encrypt_error", "Failed to compare the value with the hash", error)
        }
    }
}
