import InputComponent from "../input"

import "./styles.css"

export default function ChatComponent() {
    return (
        <div className="chat-container">
            <div className="messages">
                Messages here
            </div>
            <InputComponent />
        </div>
    )
}