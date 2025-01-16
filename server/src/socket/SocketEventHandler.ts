import { Server, Socket } from "socket.io"
import { logger } from "../library/logger" 

import { NotificationUsecase } from "../usecase/notification/NotificationUsecase"
import { ChatUseCase } from "../usecase/chat/ChatUseCase"

export abstract class SocketEvent <T> {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    abstract execute(socket: Socket, data: T)
}

export class SocketEventHandler {
    private socket: Server
    private notificationUsecase: NotificationUsecase
    private chatUsecase: ChatUseCase

    constructor(socket: Server, notificationUsecase: NotificationUsecase, chatUsecase: ChatUseCase) {
        this.socket = socket
        this.notificationUsecase = notificationUsecase
        this.chatUsecase = chatUsecase
    }

    handle(...events: SocketEvent<any>[]) {
        this.socket.on("connection", async (socket) => {
            logger.info(`${socket.handshake.address} connected sucessful as ${socket.session.username}`)

            try {
                const messages = await this.chatUsecase.getMessages(30, 0)

                socket.emit("connected", { messages })

                this.notificationUsecase.onNotification((notification) => {
                    if (socket.session.id === notification.target) {
                        socket.emit("notification", notification)
                    }
                })
    
                events.forEach((event) => {
                    logger.debug(`Registering the event ${event.name} ${new Date().toISOString()}`)
                    socket.on(event.name, (values) => event.execute(socket, values))
                })
            } catch (error: any) {
                
            }
        })
    }
}