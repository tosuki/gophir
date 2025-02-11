import { isDatabaseError } from "../../library/error/DatabaseError"
import { ChatError } from "../../library/error/ChatError"

import type { MessageRepository } from "../../repositories/message/MessageRepository";
import type { AuthUseCase } from "../session/AuthUseCase";
import type { Message } from "../../model/Message"

export class ChatUseCase {
    private auth: AuthUseCase
    private messageRepository: MessageRepository

    constructor(authUsecase: AuthUseCase, messageRepository: MessageRepository) {
        this.auth = authUsecase
        this.messageRepository = messageRepository
    }

    async sendMessage(content: string, sessionId: number): Promise<Message> {
        try {
            const message = await this.messageRepository.save(content, sessionId)

            return message
        } catch (error: any) {
            if (isDatabaseError(error) && error.code === "foreign_key_violation") {
                throw new ChatError("invalid_message_author", "Invalid author id", error)
            }

            throw error
        }
    }

    getMessages(limit: number, offset: number): Promise<(Message & {
        author?: { id: number, username: string }
    })[]>{
        return this.messageRepository.getAll(offset, limit, true)
    }
}