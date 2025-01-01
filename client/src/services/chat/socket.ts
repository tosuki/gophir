import { io, Socket } from "socket.io-client"
import { Result } from "../../lib/result"

export function connect(passport: string): Result<Socket> {
    const socket = io("http://0.0.0.0:3333", {
        transports: ["websocket"],
        auth: {
            passport: passport,
        },
        autoConnect: false,
    })

    socket.connect()

    socket.on("connect_error", (err: any) => {
        // the reason of the error, for example "xhr poll error"
        console.log(err);
      
        // some additional description, for example the status code of the initial HTTP response
        // some additional context, for example the XMLHttpRequest object
    });

    return { data: socket }
}
