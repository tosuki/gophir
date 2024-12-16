import { Message } from "../../../api/model/Message";

import "./styles.css"

export default function MessageComponent(message: Message) {
    return (
        <div className="message-container">
            <div className="message-header">
                User { message.authorId }
            </div>
            <div className="message-body">
                { message.content }
            </div>
        </div>
    )
}