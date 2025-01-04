import { useContext, createContext, ReactNode, useEffect } from "react"
import { Socket } from "socket.io-client"

import { createSocket } from "../services/chat/socket"

export const SocketContext = createContext<Socket | undefined>(undefined)

export function SocketProvider(properties: {
    passport: string, children: ReactNode
}) {
    const socket = createSocket(properties.passport)

    useEffect(() => {
        if (
            !socket.data ||
            (socket.data && socket.data.connected)
        ) return;

        socket.data.connect()
        
        return () => {
            socket.data.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={ socket.data }>
            { properties.children }
        </SocketContext.Provider>
    )
}

export function useSocket(): Socket | undefined {
    return useContext(SocketContext)
}
