import * as express from "express"
import * as cors from "cors"

import { Server as HttpServer, createServer as createHttpServer } from "http"

import { ChatUseCase } from "../usecase/chat/ChatUseCase"

import { applyRouter } from "./router"

export const createServer = (chatUsecase: ChatUseCase): HttpServer => {
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: "*"
    }))
    
    return createHttpServer(applyRouter(chatUsecase, app))
}
