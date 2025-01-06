import type { Message } from "../../model/Message";

export interface MessageRepository {
    save(content: string, authorId: number): Promise<Message>
    getById(id: number): Promise<Message | null>
    getAll(offset: number, index: number, includeAuthor?: boolean): Promise<Message[]>
}
