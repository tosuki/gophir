import type { Server } from "http";
import type { ChatUseCase } from "src/usecase/chat/ChatUseCase";

import { GlobalSocketImpl, GlobalSocket } from "src/socket/Socket";

export const createSocketServer = (tcpServer: Server, chatUsecase: ChatUseCase): GlobalSocket => {
    return new GlobalSocketImpl(chatUsecase, tcpServer, {
        cors: {
            origin: "*",
        },
    })
}
