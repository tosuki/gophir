import InputComponent from "../input"
import MessagesComponent from "../messages"

import "./styles.css"

export default function ChatComponent() {
    
    return (
        <div className="chat-container">
            <MessagesComponent messages={[
                { authorId: 1, content: "Hello Guys!", createdAt: 0 },
                { authorId: 2, content: "That's not how it works dumbass", createdAt: 0, isMine: true },
                { authorId: 1, content: "Really? So you should know how to teach me, right?", createdAt: 0 }
            ]}/>
            <InputComponent />
        </div>
    )
}