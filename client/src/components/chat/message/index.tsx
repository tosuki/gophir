import type { Message } from "../../../model/message";

import "./styles.css"

export type MessageComponentProperties = Message & {
    sessionId: number
}

export function MessageComponent(properties: MessageComponentProperties) {
    const isMine = properties.authorId === properties.sessionId

    console.log(isMine)

    return (
        <div className={`message-row ${isMine ? "end" : "start"}`}>
            <div className="message-container">
                <div className="message-header">
                    <b>{properties.authorId}</b>: { properties.content }
                </div>
                <div className="message-body">

                </div>
            </div>
        </div>
    )
}