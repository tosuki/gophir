import { Socket, io } from "socket.io-client"

import type { Message } from "../../model/message"

export type MessageWithAuthor = Message & {
    author: { id: number, username: string }
}

export type ConnectedEventProperties = {
    messages: MessageWithAuthor[]
}

export function createSocket(passport: string): Socket {
    return io("http://0.0.0.0:3000", {
        auth: { passport },
        autoConnect: false
    })
}
