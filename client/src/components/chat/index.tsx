import { useState, useEffect } from "react"

import { useSession } from "../../hooks/session"
import { useSocket } from "../../hooks/socket"

import { toast } from "react-hot-toast"

import { PaperPlaneRight } from "phosphor-react"
import { MessageComponent } from "./message"

import type { Message } from "../../model/message"

import "./styles.css"

export function Chat() {
    const socket = useSocket()
    const { session } = useSession()

    const [messages, setMessages] = useState<(Message)[]>([])
    const [messageInputValue, setMessageInputValue] = useState<string>("")


    const onSubmitButton = () => {
        if (!messageInputValue) {
            return
        }

        socket.emit("messageReceive", messageInputValue)
        setMessageInputValue("")
    } 

    useEffect(() => {
        if (!socket) {
            throw new Error("Invalid useSocket usage, it must be used inside a SocketProvider")
        }

        socket.connect()

        socket.on("connection_error", (error) => {
            toast.error("Failed to connect to the server, check the console for more information!")
            console.log("Failed to connect to the server due to: ", error)
        })

        socket.on("connected", ({ messages }) => {
            setMessages(messages)
        })

        socket.on("messageReceive", (message) => {
            console.log(message)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className="chat-container">
            <div className="chat-body">
                <div className="chat-messages">
                    { messages.map((message) => {
                        return (
                            <MessageComponent 
                                { ...message }
                                sessionId={ session.data!.id }
                            />
                        )
                    })}
                </div>
                <div className="chat-inputs">
                    <input 
                        type="text"
                        className="chat-text-input"
                        value={ messageInputValue }
                        onChange={(e) => setMessageInputValue(e.target.value)}
                        onKeyDown={(e) => e.code === "Enter" && onSubmitButton()}
                    />
                    <button className="submit-button" onClick={ onSubmitButton }>
                        <PaperPlaneRight 
                            color="var(--header-fg)"
                            weight="fill"
                            size={ 24 }
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}