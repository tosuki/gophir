import { useEffect, useState } from "react"
import { useSession } from "../../hooks/session"

import { toast } from "react-hot-toast"
import { createSocket } from "../../services/chat/socket"

import { Header } from "../../components/header"
import { Chat } from "../../components/chat"

import type { Message} from "../../model/message"

import "./styles.css"

export function HomePage() {
    const { session } = useSession()
    const [messages, setMessages] = useState<(Message & {
        author: { id: number, username: string }
    })[]>([])

    useEffect(() => {
        if (!session.passport) {
            toast.error("Failed to connect to the server due to lack of the passport, please refresh the page to try again")
            return
        }
        const socket = createSocket(session.passport)
        
        socket.on("connection_error", (error) => {
            toast.error("Failed to connect to the server, check the console for more information")
            console.log("Failed to connect to the server: ", error)
        })

        socket.on("connect", () => {
            toast("Connected to the server")
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className="page-container">
            <Header />
            <div className="home-page-container">
            <Chat 
                messages={ messages }
                session={{
                    id: 2,
                    createdAt: new Date(),
                    expiresAt: 0,
                    issuedAt: 0,
                    username: "Carlos Henrique"
                }}
            />

            </div>
        </div>
    )
}
