import * as express from "express"
import * as cors from "cors"

import { ChatUseCase } from "../usecase/chat/ChatUseCase"

import { applyRouter } from "./router"

export const createServer = (chatUsecase: ChatUseCase): express.Express => {
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: "*"
    }))
    
    return applyRouter(chatUsecase, app)
}
