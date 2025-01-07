import { SocketEvent } from "../SocketEventHandler"
import { ChatUseCase } from "../../usecase/chat/ChatUseCase"
import type { Socket } from "socket.io"

export class MessageReceiveEvent extends SocketEvent <string> {
    constructor(chatUsecase: ChatUseCase) {
        super("messageReceive", chatUsecase)
    }

    execute(socket: Socket, data: string) {
        throw new Error("Method not implemented.")
    }
}