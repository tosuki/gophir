import { Message } from "../../api/model/Message"

import MessageComponent from "./message/message"

import "./styles.css"

export default function MessagesComponent({ messages }: { messages: (Message & { isMine?: boolean })[] }) {
    return (
        <div className="messages-container">
            { messages.map((message) => {
                return (
                    <MessageComponent 
                        id={ message.id }
                        authorId={ message.authorId }
                        content={ message.content }
                        createdAt={ message.createdAt }
                        isMine={ message.isMine }
                    />
                )
            })}
        </div>
    )
}