import { GophirError } from "./Error"

export class DatabaseError extends GophirError<
    | "foreign_key_violation"
    | "unique_constraint"
    | "null_value"
> {}

export const isDatabaseError = (error: any): error is DatabaseError => error instanceof DatabaseError
