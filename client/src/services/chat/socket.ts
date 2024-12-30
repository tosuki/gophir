import { io, Socket } from "socket.io-client"
import { Result } from "../../lib/result"

export function connect(passport: string): Result<Socket> {
    const socket = io({
        auth: {
            passport: passport,
        },
        host: "http://localhost:3333"
    })

    return { data: socket }
}
