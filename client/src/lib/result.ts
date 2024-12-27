export type Result <T> = 
    | { data?: never, error: any }
    | { data: T, error?: never }
    