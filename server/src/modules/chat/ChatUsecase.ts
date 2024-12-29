import { MessageRepository } from "./MessageRepository";

import { Session } from "../session/Session"
import { Message } from "./model/Message";
import { Result } from "src/lib/result";

export default class ChatUsecase {
    constructor(
        private messageRepository: MessageRepository
    ) {}

    public sendMessage(session: Session, content: string): Result<Message> {
        return this.messageRepository.save({
            authorId: session.id,
            content,
        })
    }
}
