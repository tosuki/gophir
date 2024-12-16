import { DisconnectReason, Socket } from "socket.io"
import { logger } from "../../../logger"
import { Result } from "../../../lib/result"

import Listener from "./Listener"

import User from "src/modules/chat/model/User"

export default class ConnectionListener extends Listener {
    public onNewConnection(socket: Socket): Result<User> {
        const connData = this.chatUsecase.connect(socket.id)

        if (connData.error) {
            return { error: connData.error }
        }

        socket.emit("connected", connData.data)
        logger.warn(`User ${connData.data.user.id} connected (socketId: ${connData.data.user.socketId})`)
        
        return { data: connData.data.user }
    }

    public onDisconnect(userId: number, reason: DisconnectReason, description: string) {
        logger.error(`User ${userId} disconnected due to ${reason}`)
        this.chatUsecase.disconnect(userId)
    }
}