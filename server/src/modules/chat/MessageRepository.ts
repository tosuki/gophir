import { PartialMessage } from "./model/PartialMessage"
import { Message } from "./model/Message"
import { Result } from "../../lib/result"

export interface MessageRepository {
    save(partialMessage: PartialMessage): Result<Message>
    getById(id: number): Result<Message>
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

    private getIndexOfMessageByID(
        id: number,
        values: number[],
        low: number = 0,
        high: number = values.length - 1
    ): number {
        const midIndex = Math.round((low + high) / 2)
        const mid = values[midIndex]

        if (id === mid) {
            return midIndex
        }

        if (low > high) {
            return -1;
        }

        return mid > id ?
            this.getIndexOfMessageByID(id, values, low, (midIndex - 1)) :
            this.getIndexOfMessageByID(id, values, (midIndex + 1), high)
    }

    public getById(id: number): Result<Message> {
        const messageIndex = this.getIndexOfMessageByID(id, Array.from(this.values.keys()))

        return {
            data: messageIndex >= 0 ?
                this.values.get(messageIndex) :
                null
        }
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
