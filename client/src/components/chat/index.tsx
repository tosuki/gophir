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
        socket.on("connected", (data: User) => {
            setUser(data)
            toast.info(`Connected to the server as User ${data.id}`)
        })

        socket.on("message", (message: Message) => {
            setMessages((previousMessages) => {
                return [...previousMessages, message]
            })
        })

        return () => {
            socket.off("connected")
            socket.off("message")
        }
    }, [])

    return (
        <div className="chat-container">
            <MessagesComponent messages={[
                { authorId: 1, content: "Hello Guys!", createdAt: 0 },
                { authorId: 2, content: "That's not how it works dumbass", createdAt: 0, isMine: true },
                { authorId: 1, content: "Really? So you should know how to teach me, right?", createdAt: 0 }
            ]}/>
            <InputComponent />
        </div>
    )
}