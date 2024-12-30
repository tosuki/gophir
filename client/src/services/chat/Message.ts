import { PartialMessage } from "./PartialMessage";

export type Message = PartialMessage & {
    id: number
    createdAt: number
    updatedAt: number
}
