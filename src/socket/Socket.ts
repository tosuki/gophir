import { Server, ServerOptions } from "socket.io"
import { Server as HttpServer } from "http"
import { AuthSocketHandler } from "./AuthSocketHandler"
import type { ChatUseCase } from "../usecase/chat/ChatUseCase";

import { logger } from "../library/logger"
import { SocketEvent, SocketEventHandler } from "./SocketEventHandler";
import { DisconnectSocketEventHandler } from "./events/DisconnectSocketEvent";
import { MessageReceiveEvent } from "./events/MessageReceiveEvent";

export interface GlobalSocket {
    disconnect(): Promise<void>
}

export class GlobalSocketImpl implements GlobalSocket {
    private chatUsecase: ChatUseCase
    private socket: Server
    
    private auth: AuthSocketHandler
    private eventHandler: SocketEventHandler

    constructor(
        chatUsecase: ChatUseCase,
        httpServer: HttpServer,
        opts?: Partial<ServerOptions>
    ) {
        this.chatUsecase = chatUsecase
        this.socket = new Server(httpServer, opts)

        this.auth = new AuthSocketHandler(this.chatUsecase.auth)
        this.eventHandler = new SocketEventHandler(this.socket, this.chatUsecase)

        this.registerListeners()
    }

    disconnect(): Promise<void> {
        return this.socket.close()
    }

    private registerListeners() {
        this.socket.use(this.auth.handle.bind(this.auth))
        this.eventHandler.handle(
            new DisconnectSocketEventHandler(this.chatUsecase),
            new MessageReceiveEvent(this.chatUsecase)
        )
    }
}
