import { SidebarComponent } from "../../components/sidebar"
import { ChatComponent } from "../../components/chat"

import "./styles.css"

export function ChatPage() {
    return (
        <div className="chat-page-container">
            <SidebarComponent />
            <ChatComponent />
        </div>
    )
}
