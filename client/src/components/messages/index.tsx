import { Message } from "../../api/model/Message"
import { useSession } from "../../hooks/session"

import MessageComponent from "./message/message"

import "./styles.css"

export default function MessagesComponent({ messages }: { messages: Message[] }) {
    const session = useSession()

    return (
        <div className="messages-container">
            { messages.map((message) => {
                return (
                    <MessageComponent 
                        message={ message }
                        userId={ session.states.id }                        
                    />
                )
            })}
        </div>
    )
}