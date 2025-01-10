import { Message } from "../../model/message"
import { Session } from "../../model/session"

import { PaperPlaneRight } from "phosphor-react"
import { MessageComponent } from "./message"

import "./styles.css"

export type ChatProperties = {
    messages: Message[]
    session: Session
}

export function Chat(properties: ChatProperties) {
    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="left">
                    <div className="profile-picture"></div>
                    <div className="session-card">
                        <h1>{ properties.session.username }</h1>
                        <p>#00{ properties.session.id }</p>
                    </div>
                </div>
            </div>
            <div className="chat-body">
                <div className="chat-messages">
                    { properties.messages.map((message) => {
                        return (
                            <MessageComponent 
                                { ...message }
                                sessionId={ properties.session.id }
                            />
                        )
                    })}
                </div>
                <div className="chat-inputs">
                    <input type="text" className="chat-text-input" />
                    <button className="submit-button">
                        <PaperPlaneRight 
                            color="var(--header-fg)"
                            weight="fill"
                            size={ 24 }
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}