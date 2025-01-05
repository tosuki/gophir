import { EncryptProvider, BCryptEncryptProvider } from "../provider/EncryptProvider"
import { PassportEncoder, JWTEncoder } from "../usecase/session/JwtEncoder"

import environment from "../env"

export const createEncryptProvider = (): EncryptProvider => new BCryptEncryptProvider()
export const createPassportEncoder = (): PassportEncoder => {
    return new JWTEncoder(environment.JWT_SECRET, 72*60*60*1000)
}
