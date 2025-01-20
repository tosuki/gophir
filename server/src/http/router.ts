import { Express } from "express"

import type { AuthUseCase } from "../usecase/session/AuthUseCase"
import type { NotificationUsecase } from "../usecase/notification/NotificationUsecase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"
import { HttpAuthController } from "../controller/HttpAuthController"
import { HttpNotificationController } from "../controller/HttpNotificationController"

export const applyRouter = (authUsecase: AuthUseCase, notificationUsecase: NotificationUsecase, app: Express): Express => {
    const httpAuthController = new HttpAuthController(authUsecase, notificationUsecase)
    const httpNotificationController = new HttpNotificationController(notificationUsecase, authUsecase)

    app.use("/ok", (_, response): any => {
        return response.status(HttpResponseCode.Ok).json({
            code: "ok",
            message: "Server is alive xD"
        })
    })

    app.post("/api/auth/authenticate", httpAuthController.authenticate.bind(httpAuthController))
    app.post("/api/auth/register", httpAuthController.register.bind(httpAuthController))
    app.get("/api/session/profile", httpAuthController.getSession.bind(httpAuthController))

    app.get("/api/notifications/all", httpNotificationController.getNotifications.bind(httpNotificationController))
    app.post("/api/notifications/notify", httpNotificationController.notify.bind(httpNotificationController))

    return app
}
