import { io, Socket } from "socket.io-client"
import { Result } from "../../lib/result"

export function createSocket(passport: string): Result<Socket> {
    const socket = io("http://0.0.0.0:3333", {
        transports: ["websocket"],
        auth: {
            passport: passport,
        },
        autoConnect: false,
    })

    socket.on("connect_error", (err: any) => {
        console.log("Failed to connect to the server: ", err)
    })

    return { data: socket }
}
