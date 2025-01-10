import { Header } from "../../components/header"
import { Chat } from "../../components/chat"

import "./styles.css"

export function HomePage() {
    return (
        <div className="page-container">
            <Header />
            <div className="home-page-container">
            <Chat 
                messages={[
                    {
                        authorId: 2,
                        content: "a",
                        createdAt: new Date(),
                        id: 2,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "Hello, how are you?",
                        createdAt: new Date(),
                        id: 3,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 2,
                        content: "I'm good, thank you!",
                        createdAt: new Date(),
                        id: 4,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "What are you working on?",
                        createdAt: new Date(),
                        id: 5,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 2,
                        content: "a",
                        createdAt: new Date(),
                        id: 2,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "Hello, how are you?",
                        createdAt: new Date(),
                        id: 3,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 2,
                        content: "I'm good, thank you!",
                        createdAt: new Date(),
                        id: 4,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "What are you working on?",
                        createdAt: new Date(),
                        id: 5,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 2,
                        content: "a",
                        createdAt: new Date(),
                        id: 2,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "Hello, how are you?",
                        createdAt: new Date(),
                        id: 3,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 2,
                        content: "I'm good, thank you!",
                        createdAt: new Date(),
                        id: 4,
                        updatedAt: new Date()
                    },
                    {
                        authorId: 3,
                        content: "What are you working on?",
                        createdAt: new Date(),
                        id: 5,
                        updatedAt: new Date()
                    },
                ]}
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
