import User from "../model/User";
import Message from "../model/Message"

import { Result } from "src/lib/result";
import { UserRepository } from "../repository/UserRepository";
import { MessageRepository } from "../repository/MessageRepository";

export default class ChatUsecase {
    constructor(
        private userRepository: UserRepository,
        private messageRepository: MessageRepository
    ) {}

    public sendMessage(message: string, userId: number): Result<Message> {
        return this.messageRepository.save(message, userId)
    }

    public connect(socketId: string): Result<{ user: User, messages: Message[] }> {
        const user = this.userRepository.save(socketId)
        
        if (user.error) {
            return { error: user.error }
        }
        
        const messages = this.messageRepository.getAll()
    
        if (messages.error) {
            return { error: messages.error }
        }

        return { data: { user: user.data, messages: messages.data } }
    }

    public disconnect(userId: number): Result<number> {
        return this.userRepository.deleteUser(userId)
    }
}