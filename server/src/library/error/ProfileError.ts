import { GophirError } from "./Error"

export class ProfileError extends GophirError <
    | "invalid_username"
    | "invalid_session"
    | "conflict"
    | "invalid_profile"
> {}

export const isProfileError = (error: any): error is ProfileError => error instanceof ProfileError
