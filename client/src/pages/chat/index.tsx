import { ChatComponent } from "../../components/chat"
import { Headerbar } from "../../components/headerbar"

import "./styles.css"

export function ChatPage() {
    return (
        <div className="chat-page-container">
            <Headerbar />
            <ChatComponent />
        </div>
    )
}
