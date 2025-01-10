import type { Server } from "http";

import type { ChatUseCase } from "../usecase/chat/ChatUseCase";
import type { AuthUseCase } from "../usecase/session/AuthUseCase";
import type { NotificationUsecase } from "../usecase/notification/NotificationUsecase"

import { GlobalSocketImpl, GlobalSocket } from "../socket/Socket";

export const createSocketServer = (
    tcpServer: Server,
    chatUsecase: ChatUseCase,
    authUsecase: AuthUseCase,
    notificationUsecase: NotificationUsecase
): GlobalSocket => {
    return new GlobalSocketImpl(chatUsecase, authUsecase, notificationUsecase, tcpServer, {
        cors: {
            origin: "*",
        },
    })
}
