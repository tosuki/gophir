import { Express } from "express"
import type { ChatUseCase } from "src/usecase/chat/ChatUseCase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"
import { HttpAuthController } from "../controller/HttpAuthController"

export const applyRouter = (chatUsecase: ChatUseCase, app: Express): Express => {
    const httpAuthController = new HttpAuthController(chatUsecase.auth)

    app.use("/ok", (_, response): any => {
        return response.status(HttpResponseCode.Ok).json({
            code: "ok",
            message: "Server is alive xD"
        })
    })

    app.post("/api/auth/authenticate", httpAuthController.authenticate.bind(httpAuthController))
    app.post("/api/auth/register", httpAuthController.register.bind(httpAuthController))
    app.get("/api/session/profile", httpAuthController.getProfile.bind(httpAuthController))

    return app
}
