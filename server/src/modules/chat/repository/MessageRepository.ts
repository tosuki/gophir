import Message from "../model/Message"

import { Repository } from "./Repository"
import { Result } from "src/lib/result"

export interface MessageRepository {
    save(message: string, userId: number)
    getById(id: number): Result<Message>
}

export default class MessageRepositoryImpl extends Repository<Message> implements MessageRepository {
    public save(messageContent: string, userId: number): Result<Message> {
        const message: Message = {
            id: (this.values.length),
            content: messageContent,
            authorId: userId,
            createdAt: Date.now()
        }

        this.values.push(message)

        return { data: message }
    }

    public getById(id: number): Result<Message> {
        const index = this.getIndex(id, (message) => message.id)

        if (index === -1) {
            return { error: "not_found" }
        }

        return { data: this.values[index] }
    }
}
