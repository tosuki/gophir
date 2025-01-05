export class GophirError <T extends string> {
    public code: T
    public message: string
    public cause?: any

    constructor(code: T, message: string, cause?: any) {
        this.code = code
        this.message = message
        this.cause = cause
    }
}
