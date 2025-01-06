import { DatabaseProvider } from "../../provider/DatabaseProvider"

import type { Message } from "src/model/Message";
import type { MessageRepository } from "./MessageRepository"

import { CriticalError } from "../../library/error/CriticalError"

export class MessageRepositoryImpl implements MessageRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    async save(content: string, authorId: number): Promise<Message> {
        throw new CriticalError("database_error", "to-do")
    }

    getById(id: number): Promise<Message | null> {
        throw new CriticalError("database_error", "to-do")
    }

    getAll(offset: number, index: number, includeAuthor?: boolean): Promise<Message[]> {
        throw new CriticalError("database_error", "to-do")
    }
}