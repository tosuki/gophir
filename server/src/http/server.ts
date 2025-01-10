import * as express from "express"
import * as cors from "cors"

import { Server as HttpServer, createServer as createHttpServer } from "http"
import { AuthUseCase } from "../usecase/session/AuthUseCase"

import { applyRouter } from "./router"

export const createServer = (authUsecase: AuthUseCase): HttpServer => {
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: "*"
    }))
    
    return createHttpServer(applyRouter(authUsecase, app))
}
