import { Server, Socket } from "socket.io"
import { ChatUseCase } from "../usecase/chat/ChatUseCase"

export abstract class SocketEvent <T> {
    public name: string
    protected chatUsecase: ChatUseCase

    constructor(name: string, chatUsecase: ChatUseCase) {
        this.name = name
        this.chatUsecase = chatUsecase
    }

    abstract execute(socket: Socket, data: T)
}

export class SocketEventHandler {
    private socket: Server
    private chatUsecase: ChatUseCase

    constructor(socket: Server, chatUsecase: ChatUseCase) {
        this.socket = socket
        this.chatUsecase = chatUsecase
    }

    handle(...events: SocketEvent<any>[]) {
        this.socket.on("connection", (socket) => {
            events.forEach((event) => {
                socket.on(event.name, event.execute.bind(event))
            })
        })
    }
}