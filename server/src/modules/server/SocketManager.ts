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
                origin: "*"
            }
        })
    }

    public connect() {
        this.use(socketAuthMiddlware)//only authenticated user can connect

        this.on("connection", (socket) => {
            console.log(`${socket.id} connected`)

            socket.on("disconnect", (reason) => {
                logger.debug(`${socket.id} disconnect due to ${reason}`)
            })
        })
    }
}