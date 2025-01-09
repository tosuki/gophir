import { Header } from "../../components/header"
import { Chat } from "../../components/chat"

import "./styles.css"

export function HomePage() {
    return (
        <div className="page-container">
            <Header />
            <div className="home-page-container">
                <Chat 
                    messages={[]}
                    session={{
                        id: 2,
                        createdAt: new Date(),
                        expiresAt: 0,
                        issuedAt: 0,
                        username: "Carlos Henrique"
                    }}
                />
            </div>
        </div>
    )
}
