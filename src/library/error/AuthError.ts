import { GophirError } from "./Error"

export type AuthErrorCodes =
    | "invalid_password"
    | "invalid_email"
    | "invalid_token"
    | "expired_token"

export class AuthError extends GophirError<AuthErrorCodes> {}
export const isAuthError = (error: any): error is AuthError  => error instanceof AuthError
