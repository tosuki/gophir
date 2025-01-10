import type { Server } from "http";
import type { ChatUseCase } from "../usecase/chat/ChatUseCase";
import type { AuthUseCase } from "../usecase/session/AuthUseCase";

import { GlobalSocketImpl, GlobalSocket } from "../socket/Socket";

export const createSocketServer = (tcpServer: Server, chatUsecase: ChatUseCase, authUsecase: AuthUseCase): GlobalSocket => {
    return new GlobalSocketImpl(chatUsecase, authUsecase, tcpServer, {
        cors: {
            origin: "*",
        },
    })
}
