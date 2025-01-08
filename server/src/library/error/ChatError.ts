import { GophirError } from "./Error"

export class ChatError extends GophirError<
    | "invalid_message_author"
> {}

export const isChatError = (error: any): error is ChatError => {
    return error instanceof ChatError
}
