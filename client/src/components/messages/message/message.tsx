import { Message } from "../../../api/model/Message";

import "./styles.css"

export default function MessageComponent({ message, userId }: {
    message: Message,
    userId: number
}) {
    console.log(`[${message.authorId === userId}] ${message.content}`)

    return (
        <div className={`message-row ${message.authorId === userId ? "end" : "start"}`}>
            <div className="message-container">
                <div className="message-header">
                    User { message.authorId }
                </div>
                <div className="message-body">
                    { message.content }
                </div>
            </div>
        </div>
    )
}