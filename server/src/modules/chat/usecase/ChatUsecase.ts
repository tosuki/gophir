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

    public connect(socketId: string): Result<User> {
        return this.userRepository.save(socketId)
    }

    public disconnect(socketId: number): Result<number> {
        return { error: "to-do" }
    }
}