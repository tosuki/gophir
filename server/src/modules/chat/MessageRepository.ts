import { PartialMessage } from "./model/PartialMessage"
import { Message } from "./model/Message"
import { Result } from "../../lib/result"

export interface MessageRepository {
    save(partialMessage: PartialMessage): Result<Message>
}

export class InMemoryMessageRepositoryImpl implements MessageRepository {
    private values: Map<number, Message> = new Map()

    private getHighestId(keys: number[]): number | null {
        if (keys.length ===  0) {
            return null
        }
        
        const highest = this.getHighestId(keys.slice(1))

        return keys[0] > highest ? keys[0] : highest
    }

    private createId(): number {
        const highest = this.getHighestId(Array.from(this.values.keys()))

        return highest ? highest : 1
    }

    public save(partialMessage: PartialMessage): Result<Message> {
        const now = Date.now()
        
        const message: Message = {
            id: this.createId(),
            createdAt: now,
            updatedAt: now,
            ...partialMessage,
        }

        this.values.set(message.id, message)

        return { data: message }
    }
}
