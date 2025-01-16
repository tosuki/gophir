import { useSession } from "../../hooks/session"

import { SocketProvider } from "../../hooks/socket"
import { Header } from "../../components/header"
import { Chat } from "../../components/chat"

import "./styles.css"

export function HomePage() {
    const { session } = useSession()

    return (
        <div className="page-container">
            <Header />
            <div className="home-page-container">
                <SocketProvider passport={ session.passport }>
                    <Chat />
                </SocketProvider>
            </div>
        </div>
    )
}
