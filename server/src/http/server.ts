import * as express from "express"
import * as cors from "cors"

import { Server as HttpServer, createServer as createHttpServer } from "http"

import { AuthUseCase } from "../usecase/session/AuthUseCase"
import { NotificationUsecase } from "../usecase/notification/NotificationUsecase"
import { ProfileUsecase } from "../usecase/session/ProfileUsecase"

import { applyRouter } from "./router"

export const createServer = (
    authUsecase: AuthUseCase,
    notificationUsecase: NotificationUsecase,
    profileUsecase: ProfileUsecase
): HttpServer => {
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: "*"
    }))

    return createHttpServer(applyRouter(authUsecase, notificationUsecase, app))
}
