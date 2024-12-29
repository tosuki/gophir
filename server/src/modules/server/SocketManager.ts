import { Server } from "socket.io"
import { Server as HttpServer } from "http"

import { socketAuthMiddlware } from "./auth/middlware"
import { logger } from "../../logger"

import ChatUsecase from "../chat/ChatUsecase"

export default class SocketManager extends Server {
    private chatUsecase: ChatUsecase

    constructor(httpServer: HttpServer, chatUsecase: ChatUsecase) {
        super(httpServer, {
            cors: {
                origin: "http://localhost:5173"
            }
        })
    }

    public connect() {
        this.use(socketAuthMiddlware)//only authenticated user can connect

        this.on("connection", (socket) => {
            logger.debug(`[${socket.session.username} | ${socket.id}] connected`)

            socket.on("message", (message: string) => {
                const result = this.chatUsecase.sendMessage(socket.session, message)

                if (result.error) {
                    logger.error(`Failed to process the message sent by ${socket.session.username} due to ${result.error}`)
                }

                socket.emit("message", result.data)
            })

            socket.on("disconnect", (reason) => {
                logger.debug(`${socket.id} disconnect due to ${reason}`)
            })
        })
    }
}