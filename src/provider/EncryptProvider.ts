export interface EncryptProvider {
    encrypt(value: string): string
    compare(value: string, encrypted: string): Promise<boolean>
}

export class BCryptEncryptProvider implements EncryptProvider {
    encrypt(value: string): string {
        return value
    }

    async compare(value: string, encrypted: string): Promise<boolean> {
        return false
    }
}
