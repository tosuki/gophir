import { createContext, useContext, ReactNode } from "react"
import { Socket } from "socket.io-client"
import { createSocket } from "../services/chat/socket"

const SocketContext = createContext<Socket>(null as any)

export function SocketProvider({ children, passport }: {
    children: ReactNode,
    passport: string
}) {
    const socket = createSocket(passport)

    return (
        <SocketContext.Provider value={ socket }>
            { children }
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext)
