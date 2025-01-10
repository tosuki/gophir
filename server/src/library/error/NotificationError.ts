import { GophirError } from "./Error"

export class NotificationError extends GophirError<
    | "invalid_target_id"
> {}