import { useState } from "react"

import socket from "../../socket"

import "./styles.css"

export default function InputComponent() {
    const [messageContent, setMessageContent] = useState<string>("Empty")

    const onKeyDown = (e: any) => {
        if (e.code !== "Enter") {
            return
        }

        socket.emit("message", messageContent )
    }

    return (
        <div className="input-container">
            <input 
                type="text"
                className="input-element"
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={ onKeyDown }
            />
            <div className="button"></div>
        </div>
    )
}