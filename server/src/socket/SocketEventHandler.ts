import { Server, Socket } from "socket.io"
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

    constructor(socket: Server) {
        this.socket = socket
    }

    handle(...events: SocketEvent<any>[]) {
        this.socket.on("connection", (socket) => {
            events.forEach((event) => {
                socket.on(event.name, event.execute.bind(event))
            })
        })
    }
}