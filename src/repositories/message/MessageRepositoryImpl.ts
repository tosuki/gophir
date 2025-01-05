import type { Message } from "src/model/Message";
import type { MessageRepository } from "./MessageRepository"
import { Knex } from "knex";

export class MessageRepositoryImpl implements MessageRepository {
    private knex: Knex

    constructor(knex: Knex) {
        this.knex = knex
    }

    save(content: string, authorId: number): Promise<Message> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<Message | null> {
        throw new Error("Method not implemented.");
    }
    
}