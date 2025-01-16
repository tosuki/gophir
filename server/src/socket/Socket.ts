import { Server, ServerOptions } from "socket.io"
import { Server as HttpServer } from "http"
import { AuthSocketHandler } from "./AuthSocketHandler"

import type { ChatUseCase } from "../usecase/chat/ChatUseCase";
import type { AuthUseCase } from "../usecase/session/AuthUseCase";
import type { NotificationUsecase } from "../usecase/notification/NotificationUsecase"

import { SocketEventHandler } from "./SocketEventHandler";
import { DisconnectSocketEventHandler } from "./events/DisconnectSocketEvent";
import { MessageReceiveEvent } from "./events/MessageReceiveEvent";

export interface GlobalSocket {
    disconnect(): Promise<void>
}

export class GlobalSocketImpl implements GlobalSocket {
    private chatUsecase: ChatUseCase
    private notificationUsecase: NotificationUsecase
    private authUsecase: AuthUseCase
    private socket: Server
    
    private auth: AuthSocketHandler
    private eventHandler: SocketEventHandler

    constructor(
        chatUsecase: ChatUseCase,
        authUsecase: AuthUseCase,
        notificationUsecase: NotificationUsecase,
        httpServer: HttpServer,
        opts?: Partial<ServerOptions>
    ) {
        this.chatUsecase = chatUsecase
        this.notificationUsecase = notificationUsecase
        this.authUsecase = authUsecase

        this.socket = new Server(httpServer, opts)

        this.auth = new AuthSocketHandler(this.authUsecase)
        this.eventHandler = new SocketEventHandler(
            this.socket,
            this.notificationUsecase,
            this.chatUsecase
        )

        this.registerListeners()
    }

    disconnect(): Promise<void> {
        return this.socket.close()
    }

    private registerListeners() {
        this.socket.use(this.auth.handle.bind(this.auth))
        this.eventHandler.handle(
            new DisconnectSocketEventHandler(this.notificationUsecase),
            new MessageReceiveEvent(this.chatUsecase)
        )
    }
}
