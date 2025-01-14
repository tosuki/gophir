import { DatabaseProvider } from "../../provider/DatabaseProvider"

import type { User } from "../../model/User"
import type { Message } from "../../model/Message";
import type { MessageRepository } from "./MessageRepository"

export class MessageRepositoryImpl implements MessageRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    save(content: string, authorId: number): Promise<Message> {
        return this.databaseProvider.save<Message>("messages", {
            content,
            authorId,
        })
    }

    getById(id: number): Promise<Message | null> {
        return this.databaseProvider.findFirst<Message>("messages", {
            messageId: id
        })
    }


    private async getAllMessagesWithAuthor(offset: number, limit: number): Promise<(Message & {
        author?: { id: number, username: string }
    })[]> {
        const rawMessages = await this.databaseProvider.getAllWithReference<Message, User>(
            "messages",
            "users",
            "authorId",
            "id",
            limit,
            offset,
            ["messages.*", "users.id", "users.username"]
        )

        return rawMessages.map(({ id, username, ...message }) => {
            return {
                ...message,
                author: { id, username },
            }
        })
    }

    getAll(offset: number, limit: number, includeAuthor?: boolean): Promise<(Message & {
        author?: { id: number, username: string }
    })[]> {
        return includeAuthor ? 
            this.getAllMessagesWithAuthor(offset, limit) :
            this.databaseProvider.getAll("messages", limit, offset)
    }
}