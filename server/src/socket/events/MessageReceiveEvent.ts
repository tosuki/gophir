import { SocketEvent } from "../SocketEventHandler"
import { ChatUseCase } from "../../usecase/chat/ChatUseCase"

import { logger } from "../../library/logger"

import type { Socket } from "socket.io"
import { isChatError } from "../../library/error/ChatError"

export class MessageReceiveEvent extends SocketEvent <string> {
    private chatUsecase: ChatUseCase

    constructor(chatUsecase: ChatUseCase) {
        super("messageReceive")

        this.chatUsecase = chatUsecase
    }

    async execute(socket: Socket, data: string) {
        console.log(`${socket.session.username}: ${data}`)
        try {
            const message = await this.chatUsecase.sendMessage(data, socket.session.id)

            socket.broadcast.emit("messageReceive", {
                ...message,
                author: {
                    id: socket.session.id,
                    username: socket.session.username
                }
            })
        } catch (err: any) {
            if (isChatError(err) && err.code === "invalid_message_author") {
                return socket.emit("message_error", err)
            }

            logger.error
        }
    }
}
