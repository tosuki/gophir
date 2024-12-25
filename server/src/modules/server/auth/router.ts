import { Router } from "express"

import { AuthUsecase } from "../../session/AuthUsecase"
import { AuthHttpController } from "./controller/AuthHttpController"

import { httpAuthMiddlware } from "../auth/middlware"

import { OK } from "../util/codes"

export function registerRoutes(authUsecase: AuthUsecase): Router {
    const router = Router()
    const controller = new AuthHttpController(authUsecase)

    router.post("/register", controller.register.bind(controller))
    router.post("/authenticate", controller.authenticate.bind(controller))
    router.get("/rewoke", httpAuthMiddlware, (_, res) => {
        res.status(OK).json({
            ok: true,
            data: "hello-world"
        })
    })

    return router
}