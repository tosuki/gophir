import { DatabaseProvider } from "../../provider/DatabaseProvider"

import type { Message } from "src/model/Message";
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
        return this.databaseProvider.findFirst<Message>("messages", { id })
    }

    getAll(offset: number, limit: number, includeAuthor?: boolean): Promise<Message[]> {
        return this.databaseProvider.getAll<Message>("messages", limit, offset)
    }
}