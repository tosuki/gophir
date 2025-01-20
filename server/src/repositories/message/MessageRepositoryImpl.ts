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
        return this.databaseProvider.save("messages", {
            value: { content, authorId }
        })
    }

    getById(id: number): Promise<Message | null> {
        return this.databaseProvider.findFirst<Message>("messages", {
            where: {
                messageId: id,
            }
        })
    }


    private async getAllMessagesWithAuthor(offset: number, limit: number): Promise<(Message & {
        author?: { id: number, username: string }
    })[]> {
        const rawMessages = await this.databaseProvider.selectWithReference<Message, User>(
            "messages",
            {
                referenceTable: "users",
                referenceKey: "authorId",
                referenceTo: "id",
                select: ["messages.*", "users.id", "users.username"],
                orderBy: "createdAt",
                limit,
                offset,
            },
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
            this.databaseProvider.selectAll("messages", { limit, offset, orderBy: "createdAt" })
    }
}
