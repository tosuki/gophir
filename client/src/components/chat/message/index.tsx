import type { Message } from "../../../model/message";

import { useProfile } from "../../../hooks/profile";

import "./styles.css"

export type MessageComponentProperties = Message & {
    sessionId: number
}

export function MessageComponent(properties: MessageComponentProperties) {
    const profile = useProfile()
    const isMine = properties.authorId === properties.sessionId

    return (
        <div className={`message-row ${isMine ? "end" : "start"}`}>
            <div className="message-container">
            <div className="message-header" onClick={() => {
                profile.toggle("admin")
            }}>
                    <b>{properties.author.username}</b>
                </div>
                <div className="message-body">
                    { properties.content }
                </div>
            </div>
        </div>
    )
}
