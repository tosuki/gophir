import { Message } from "../../api/model/Message"

import MessageComponent from "./message/message"

import "./styles.css"

export default function MessagesComponent({ messages }: { messages: Message[] }) {
    return (
        <div className="messages-container">
            { messages.map((message) => {
                return (
                    <MessageComponent 
                        authorId={ message.authorId }
                        content={ message.content }
                        createdAt={ message.createdAt }
                    />
                )
            })}
        </div>
    )
}