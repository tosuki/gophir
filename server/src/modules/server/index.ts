import * as express from "express"
import * as cors from "cors"

import SocketManager from "./SocketManager"
import ChatUsecase from "../chat/ChatUsecase"

import { createServer } from "http"
import { registerRoutes } from "./auth/router"

import { AuthUsecase } from "../session/AuthUsecase"

import { createPrismaClient } from "../prisma"
import { InMemoryMessageRepositoryImpl } from "../chat/MessageRepository"

const app = express()
const httpServer = createServer(app)

const prismaClient = createPrismaClient()

const authUsecase = new AuthUsecase(prismaClient)
const sessionRouter = registerRoutes(authUsecase)

app.use(express.json())
app.use(cors())
app.use("/api/session", sessionRouter)

const messageRepository = new InMemoryMessageRepositoryImpl()
const chatUsecase = new ChatUsecase(messageRepository)
const socketManager = new SocketManager(httpServer, chatUsecase)

app.get("/ok", (_, response) => {
    response.status(201).json({
        ok: true,
        message: "hello world"
    })
})

socketManager.connect()

export default httpServer

