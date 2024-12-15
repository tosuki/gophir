import * as express from "express"

import SocketManager from "./socket/SocketManager"
import { createServer } from "http"
import UserRepositoryImpl from "../chat/repository/UserRepository"
import ChatUsecase from "../chat/usecase/ChatUsecase"

const app = express()
const httpServer = createServer(app)

const userRepository = new UserRepositoryImpl()
const chatUsecase = new ChatUsecase(userRepository)

const socketManager = new SocketManager(httpServer, chatUsecase)

app.get("/ok", (_, response) => {
    response.status(201).json({
        ok: true,
        message: "hello world"
    })
})

socketManager.connect()

export default httpServer

