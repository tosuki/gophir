import { GophirError } from "./Error"

export class CriticalError extends GophirError<
    | "database_error"
    | "encrypt_error"
    | "unhandled"
> {}

export const isCriticalError = (error: any): error is CriticalError => error instanceof CriticalError
