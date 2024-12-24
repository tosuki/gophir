import { Server } from "socket.io"
import { Server as HttpServer } from "http"

import ChatUsecase from "../../chat/usecase/ChatUsecase"
import MessageListener from "./MessageListener"
import ConnectionListener from "./ConnectionListener"

import { authMiddlware } from "./middlware"

export default class SocketManager extends Server {
    private chatUsecase: ChatUsecase

    private connectionListener: ConnectionListener
    private messageListener: MessageListener

    constructor(httpServer: HttpServer, chatUsecase: ChatUsecase) {
        super(httpServer, {
            cors: {
                origin: "http://localhost:5173"
            }
        })

        this.chatUsecase = chatUsecase

        this.connectionListener = new ConnectionListener(this.chatUsecase, this)
        this.messageListener = new MessageListener(this.chatUsecase, this)

    }

    public connect() {
        this.use(authMiddlware)

        this.on("connection", (socket) => {
            const result = this.connectionListener.onNewConnection(socket)
    
            if (result.error) {
                return
            } 

            socket.on("message", (message: string) => {
                this.messageListener.handleNewMessages(message, result.data.id)
            })

            socket.on("disconnect", this.connectionListener.onDisconnect.bind(this, result.data.id))
        })
    }

    public disconnect() {
        this.removeAllListeners()
    }
}