import { Server } from "socket.io"
import { Server as HttpServer } from "http"

import { socketAuthMiddlware } from "./auth/middlware"
import { logger } from "../../logger"

export default class SocketManager extends Server {
    constructor(httpServer: HttpServer) {
        super(httpServer, {
            cors: {
                origin: "http://localhost:5173"
            }
        })
    }

    public connect() {
        this.use(socketAuthMiddlware)

        this.on("connection", (socket) => {
            socket.on("disconnect", (reason) => {
                logger.debug(`${socket.id} disconnect due to ${reason}`)
            })
        })
    }

    public disconnect() {
        this.removeAllListeners()
    }
}