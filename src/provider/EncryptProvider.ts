import { CriticalError } from "../library/error/CriticalError"

export interface EncryptProvider {
    encrypt(value: string): string
    compare(value: string, encrypted: string): Promise<boolean>
}

export class BCryptEncryptProvider implements EncryptProvider {
    encrypt(value: string): string {
        throw new CriticalError("encrypt_error", "method not implemented yet")
    }

    async compare(value: string, encrypted: string): Promise<boolean> {
        return false
    }
}
