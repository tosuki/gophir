import { Router } from "express"

import { AuthUsecase } from "../../session/AuthUsecase"
import { AuthHttpController } from "./controller/AuthHttpController"

import { httpAuthMiddlware } from "../auth/middlware"

export function registerRoutes(authUsecase: AuthUsecase): Router {
    const router = Router()
    const controller = new AuthHttpController(authUsecase)

    router.post("/register", controller.register.bind(controller))
    router.post("/authenticate", controller.authenticate.bind(controller))
    router.get("/rewoke", httpAuthMiddlware, controller.rewoke.bind(controller))

    return router
}