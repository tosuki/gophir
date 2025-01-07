import { SocketEvent } from "../SocketEventHandler"
import { logger } from "../../library/logger"

import type { ChatUseCase } from "src/usecase/chat/ChatUseCase"
import type { Socket } from "socket.io"


export class DisconnectSocketEventHandler extends SocketEvent <string> {
    constructor(chatUsecase: ChatUseCase) {
        super("disconnect", chatUsecase)
    }

    execute(socket: Socket, reason: string) {
        logger.error(`${socket.handshake.address} disconnected due to ${reason}`)
    }
}
