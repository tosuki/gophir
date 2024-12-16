import { Message } from "../../../api/model/Message";

import "./styles.css"

export default function MessageComponent(message: Message & { isMine?: boolean }) {
    console.log(`The message is mine? ${message.isMine}`)

    return (
        <div className={`message-row ${message.isMine ? "end" : "start"}`}>
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