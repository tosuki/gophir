import { DisconnectReason, Socket } from "socket.io"
import { logger } from "../../../logger"
import { Result } from "../../../lib/result"

import Listener from "./Listener"

import User from "src/modules/chat/model/User"

export default class ConnectionListener extends Listener {
    public onNewConnection(socket: Socket): Result<User> {
        const user = this.chatUsecase.connect(socket.id)

        if (user.error) {
            return user
        }

        socket.emit("connected", user.data)
        logger.warn(`User ${user.data.id} connected (socketId: ${user.data.socketId})`)
        
        return user
    }

    public onDisconnect(userId: number, reason: DisconnectReason, description: string) {
        logger.error(`User ${userId} disconnected due to ${reason}`)
        this.chatUsecase.disconnect(userId)
    }
}