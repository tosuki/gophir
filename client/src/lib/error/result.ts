export type Error <T extends string> = {
    code: T,
    message: string,
    cause?: any
}

export type Result <T, E extends string> =
    | { data?: never, error: Error<E> }
    | { data: T, error?: never }
