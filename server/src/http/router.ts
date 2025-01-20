import { Express } from "express"

import type { AuthUseCase } from "../usecase/session/AuthUseCase"
import type { NotificationUsecase } from "../usecase/notification/NotificationUsecase"
import type { ProfileUsecase } from "../usecase/session/ProfileUsecase"

import { HttpResponseCode } from "../library/http/HttpResponseCode"

import { HttpAuthController } from "../controller/HttpAuthController"
import { HttpNotificationController } from "../controller/HttpNotificationController"
import { HttpProfileController } from "../controller/HttpProfileController"

export const applyRouter = (authUsecase: AuthUseCase, notificationUsecase: NotificationUsecase, profileUsecase: ProfileUsecase, app: Express): Express => {
    const httpAuthController = new HttpAuthController(authUsecase, notificationUsecase)
    const httpNotificationController = new HttpNotificationController(notificationUsecase, authUsecase)
    const httpProfileController = new HttpProfileController(profileUsecase, authUsecase)

    app.use("/ok", (_, response): any => {
        return response.status(HttpResponseCode.Ok).json({
            code: "ok",
            message: "Server is alive xD"
        })
    })

    app.post("/api/auth/authenticate", httpAuthController.authenticate.bind(httpAuthController))
    app.post("/api/auth/register", httpAuthController.register.bind(httpAuthController))
    app.get("/api/session/check", httpAuthController.getSession.bind(httpAuthController))

    app.get("/api/profile/:username", httpProfileController.getProfile.bind(httpProfileController))

    app.get("/api/notifications/all", httpNotificationController.getNotifications.bind(httpNotificationController))
    app.post("/api/notifications/notify", httpNotificationController.notify.bind(httpNotificationController))

    return app
}
