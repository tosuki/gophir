import { useState } from "react"

import "./styles.css"

import { CommonInput } from "../inputs/common"
import { SubmitButton } from "../buttons/submit"

import toast from "react-hot-toast"

export function ChatComponent() {
    const [message, setMessage] = useState<string>("")

    const onSubmit = () => {
        setMessage("")
        toast(message || "hello")
    }

    return (
        <div className="chat-container">
            <div className="messages-container">

            </div>
            <div className="inputs-container">
                <CommonInput 
                    setValue={ setMessage }
                    value={ message }
                    placeholder="Message your friends"
                    onSubmit={ onSubmit }
                />
                <div className="button-container">
                    <SubmitButton 
                        placeholder=""
                        onClick={ onSubmit }
                    />
                </div>
            </div>
        </div>
    )
}