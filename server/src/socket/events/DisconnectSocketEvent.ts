import { SocketEvent } from "../SocketEventHandler"

import { Socket } from "socket.io"
import { logger } from "../../library/logger"

import { NotificationUsecase } from "../../usecase/notification/NotificationUsecase"

export class DisconnectSocketEventHandler extends SocketEvent <string> {
    private notificationUsecase: NotificationUsecase

    constructor(notificationUsecase: NotificationUsecase) {
        super("disconnect")

        this.notificationUsecase = notificationUsecase
    }

    execute(socket: Socket, reason: string) {
        this.notificationUsecase.clearListener()
        logger.error(`${socket.session.username} disconnected due to ${reason}`)
    }
}
