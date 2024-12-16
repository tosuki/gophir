import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import InputComponent from "../input"
import MessagesComponent from "../messages"

import "./styles.css"

import socket from "../../socket"

import { Message } from "../../api/model/Message"
import { User } from "../../api/model/User"

export default function ChatComponent() {
    const [user, setUser] = useState<User>({} as User)
    const [messages, setMessages] = useState<(Message & { isMine?: boolean })[]>([])

    useEffect(() => {
        socket.on("connected", (data: { user: User, messages: Message[] }) => {
            setUser(data.user)
            setMessages(data.messages.map((message) => {
                return {
                    ...message,
                    isMine: (message.authorId == user.id)
                }
            }))
            toast.info(`Connected to the server as User ${data.user.id}`)
        })

        socket.on("message", (message: Message) => {
            console.log("New message", message)
            setMessages((previousMessages) => {
                return [...previousMessages, {
                    ...message,
                    isMine: (message.authorId === user.id),
                }]
            })
        })

        return () => {
            socket.off("connected")
            socket.off("message")
        }
    }, [])

    return (
        <div className="chat-container">
            <MessagesComponent messages={ messages }/>
            <InputComponent />
        </div>
    )
}