import { Server, Socket } from "socket.io"

import { NotificationUsecase } from "../usecase/notification/NotificationUsecase"

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

    constructor(socket: Server, notificationUsecase: NotificationUsecase) {
        this.socket = socket
        this.notificationUsecase = notificationUsecase
    }

    handle(...events: SocketEvent<any>[]) {
        this.socket.on("connection", (socket) => {
            this.notificationUsecase.onNotification((notification) => {
                if (socket.session.id === notification.target) {
                    socket.emit("notification", notification)
                }
            })

            events.forEach((event) => {
                socket.on(event.name, event.execute.bind(event))
            })
        })
    }
}