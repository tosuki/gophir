import { useEffect } from "react"
import { useState } from "react"
import { useSocket } from "../../hooks/socket"

import { CommonInput } from "../inputs/common"
import { SubmitButton } from "../buttons/submit"
import { MessageComponent } from "./message"

import { Message } from "../../services/chat/Message"
import { ConnectedEventParams, MessageReceiveParams } from "../../services/chat/events"

import "./styles.css"

export type ChatComponentProperties = {
    messages: Message[]
}

export function ChatComponent() {
    const socket = useSocket()

    const [messageInput, setMessageInput] = useState<string>("")
    const [_, setMessages] = useState<Message[]>([])

    const onSubmit = () => {
        if (!messageInput) {
            return
        }
        socket?.emit("messageReceive", messageInput)
        setMessageInput("")
    }

    useEffect(() => {
        if (!socket) {
            throw new Error(`Invalid usage of ChatComponent, it requires to be inside a SocketProvider`)
        }

        socket.on("connected", ({ messages }: ConnectedEventParams) => {
            setMessages(messages)
        })

        socket.on("messageReceive", (message: MessageReceiveParams) => {
            console.log(`New message from ${message.author.username}`, message)
            
            setMessages((previousMessages) => {
                previousMessages.push(message)

                return previousMessages
            })
        })

        return () => {
            socket.off("connected")
        }
    }, [])

    return (
        <div className="chat-container">
            <div className="messages-container">
                <MessageComponent 
                    author={{
                        id: 1,
                        username: "tosuki",
                    }}
                    authorId={ 1 }
                    content="Hello WOrldHello WOrldHello WOrldHello WOrldHello WOrldHello WOrldHello WOrldHello WOrld"
                    createdAt={ new Date().getTime() }
                    updatedAt={ 0 }
                    id={ 2 }
                />
            </div>
            <div className="inputs-container">
                <CommonInput 
                    setValue={ setMessageInput }
                    value={ messageInput }
                    placeholder="Message your friends"
                    onSubmit={ onSubmit }
                />
                <div className="button-container">
                    <SubmitButton 
                        placeholder=""
                        onClick={ onSubmit }
                    />
                </div>
            </div>
        </div>
    )
}