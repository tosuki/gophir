import { SocketEvent } from "../SocketEventHandler"
import { ChatUseCase } from "../../usecase/chat/ChatUseCase"
import type { Socket } from "socket.io"

import { logger } from "../../library/logger"

import { isCriticalError } from "../../library/error/CriticalError"

export class MessageReceiveEvent extends SocketEvent <string> {
    private chatUsecase: ChatUseCase

    constructor(chatUsecase: ChatUseCase) {
        super("messageReceive")

        this.chatUsecase = chatUsecase
    }

    async execute(socket: Socket, data: string) {
        try {
            await this.chatUsecase.sendMessage(data, socket.session.id)

            return logger.debug(`${socket.session.username} sent: ${data}`)
        } catch (error: any) {
            if (!isCriticalError(error)) {
                logger.debug(`Refused message from ${socket.session.username} due to`, error)
                return socket.emit("message_error", error)
            }

            return logger.error(`An error occured when trying to process a message from ${socket.session.username}:`, error)
        }
    }
}
