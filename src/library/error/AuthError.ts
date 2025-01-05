import { GophirError } from "./Error"

export type AuthErrorCodes =
    | "invalid_password"
    | "invalid_username"
    | "invalid_token"
    | "expired_token"
    | "username_occupied"

export class AuthError extends GophirError<AuthErrorCodes> {}
export const isAuthError = (error: any): error is AuthError  => error instanceof AuthError
