import { Message } from "../../../services/chat/Message";

import "./styles.css"

export function MessageComponent(message: Message) {
    const messageTime = new Date(message.createdAt)
    
    return (
        <div className="message-container">
            <div className="message-header">
                <div className="left">
                    <div className="profile-card"/>
                    <h1>{ message.author.username }#00{message.author.id}</h1>
                </div>
                <div className="right">
                    <p>{ messageTime.getHours() }:{ messageTime.getMinutes() }</p>
                </div>
            </div>
            <div className="message-body">
                { message.content }
            </div>
        </div>
    )
}