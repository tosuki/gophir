import { Socket } from "socket.io"
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
        
        this.globalEmitter.emit("new_connection")
        logger.debug(`User ${user.data.id} connected (socketId: ${user.data.socketId})`)
        
        return user
    }

    public onDisconnect(socket: Socket) {
        
    }
}