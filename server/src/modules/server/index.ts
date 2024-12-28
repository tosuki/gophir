import * as express from "express"
import * as cors from "cors"

import SocketManager from "./socket/SocketManager"

import { createServer } from "http"
import { registerRoutes } from "./auth/router"

import { AuthUsecase } from "../session/AuthUsecase"

import UserRepositoryImpl from "../chat/repository/UserRepository"
import MessageRepositoryImpl from "../chat/repository/MessageRepository"
import ChatUsecase from "../chat/usecase/ChatUsecase"

import { createPrismaClient } from "../prisma"

const app = express()
const httpServer = createServer(app)

const prismaClient = createPrismaClient()

const authUsecase = new AuthUsecase(prismaClient)
const sessionRouter = registerRoutes(authUsecase)

app.use(express.json())
app.use(cors())
app.use("/api/session", sessionRouter)

const userRepository = new UserRepositoryImpl()
const messageRepository = new MessageRepositoryImpl()
const chatUsecase = new ChatUsecase(userRepository, messageRepository)

const socketManager = new SocketManager(httpServer, chatUsecase)

app.get("/ok", (_, response) => {
    response.status(201).json({
        ok: true,
        message: "hello world"
    })
})

socketManager.connect()

export default httpServer

