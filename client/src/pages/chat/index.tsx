import { useEffect } from "react"
import { toast } from "react-hot-toast"

import { ChatComponent } from "../../components/chat"
import { Headerbar } from "../../components/headerbar"
import { useSession } from "../../hooks/session"

import { connect } from "../../services/chat/socket"

import "./styles.css"

export function ChatPage() {
    const session = useSession()
    const socket = connect(session.states.passport)

    useEffect(() => {
        console.log("Did it connect? ", socket)
    }, [])

    return (
        <div className="chat-page-container">
            <Headerbar />
            <ChatComponent />
        </div>
    )
}
