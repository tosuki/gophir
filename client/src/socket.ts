import { io } from "socket.io-client"

const server = io("http://localhost:3333", {
    autoConnect: true
})

export default server
