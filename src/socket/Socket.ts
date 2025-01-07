import { Server, ServerOptions } from "socket.io"
import { Server as HttpServer } from "http"
import { AuthSocketHandler } from "./SocketAuthManager"
import type { ChatUseCase } from "../usecase/chat/ChatUseCase";

import { logger } from "../library/logger"

export interface GlobalSocket {
    disconnect()
}

export class GlobalSocketImpl implements GlobalSocket {
    private chatUsecase: ChatUseCase
    private socket: Server
    private auth: AuthSocketHandler

    constructor(
        chatUsecase: ChatUseCase,
        httpServer: HttpServer,
        opts?: Partial<ServerOptions>
    ) {
        this.chatUsecase = chatUsecase
        this.socket = new Server(httpServer, opts)
        this.auth = new AuthSocketHandler(this.chatUsecase.auth)

        this.registerListeners()
    }

    disconnect() {
        this.socket.close(() => {
            logger.info(`Disconnected all the clients`)
        })
    }

    private registerListeners() {
        this.socket.use(this.auth.handle.bind(this.auth))
        this.socket.on("connection", (socket) => {
            logger.info(`${socket.handshake.address} connected to the server`)
        })
    }
}
