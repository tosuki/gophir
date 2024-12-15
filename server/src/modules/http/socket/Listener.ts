import { Server } from "socket.io"
import ChatUsecase from "src/modules/chat/usecase/ChatUsecase";

export default abstract class Listener {
    constructor(
        protected chatUsecase: ChatUsecase,
        protected globalEmitter: Server
    ) {}
}
