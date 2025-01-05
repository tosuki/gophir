import type { PartialSession } from "../../model/PartialSession"

export class JwtUseCase {
    private secret: string

    constructor(secret) {
        this.secret = secret
    }

    public encodeSession(partialSession: PartialSession) {
        throw new Error("to-do")
    }

    public decodeSession(passport: string) {
        throw new Error("to-do")
    }
}