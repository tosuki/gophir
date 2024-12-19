import { Socket } from "socket.io"

import Listener from "./Listener";

export default class MessageListener extends Listener {
    public handleNewMessages(message: string, userId: number) {
        const result = this.chatUsecase.sendMessage(message, userId)

        if (result.error) {
            return
        }

        this.globalEmitter.emit("message", result.data)
    }
}
