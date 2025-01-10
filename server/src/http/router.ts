import { Express } from "express"
import type { AuthUseCase } from "src/usecase/session/AuthUseCase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"
import { HttpAuthController } from "../controller/HttpAuthController"

export const applyRouter = (authUsecase: AuthUseCase, app: Express): Express => {
    const httpAuthController = new HttpAuthController(authUsecase)

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
