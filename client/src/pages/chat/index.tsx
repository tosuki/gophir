import { toast } from "react-hot-toast"

import { ChatComponent } from "../../components/chat"
import { Headerbar } from "../../components/headerbar"

import { useSession } from "../../hooks/session"
import { SocketProvider } from "../../hooks/socket"

import "./styles.css"

export function ChatPage() {
    const session = useSession()

    return (
        <SocketProvider passport={ session.states.passport }>
            <div className="chat-page-container">
                <Headerbar />
                <ChatComponent />
            </div>
        </SocketProvider>
    )
}
