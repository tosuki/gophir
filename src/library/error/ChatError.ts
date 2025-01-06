import { GophirError } from "./Error"

export class ChatError extends GophirError<
    | "invalid_message_author"
> {}