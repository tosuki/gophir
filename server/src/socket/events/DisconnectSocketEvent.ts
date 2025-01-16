import { SocketEvent } from "../SocketEventHandler"
import { Socket } from "socket.io"
import { logger } from "../../library/logger"

export class DisconnectSocketEventHandler extends SocketEvent <string> {
    constructor() {
        super("disconnect")
    }

    execute(socket: Socket, reason: string) {
        logger.error(`${socket.session.username} disconnected due to ${reason}`)
    }
}
