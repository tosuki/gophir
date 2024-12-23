import { Router } from "express"

import { AuthUsecase } from "../../session/AuthUsecase"
import { AuthHttpController } from "./controller/AuthHttpController"

import { OK } from "../util/codes"

export function registerRoutes(authUsecase: AuthUsecase): Router {
    const router = Router()
    const controller = new AuthHttpController(authUsecase)


    router.post("/authenticate", controller.authenticate.bind(controller))
    router.get("/rewoke", controller.middlware.bind(controller), (_, res) => {
        res.status(OK).json({
            ok: true,
            data: "hello-world"
        })
    })

    return router
}