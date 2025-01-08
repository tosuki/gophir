import { usePersistentState } from "./hooks/persistent"
import { useState } from "react"

export function App() {
    const [text, setText] = usePersistentState<string>("TEXT", "")
    const [inputText, setInputText] = useState<string>("")

    const onSubmit = () => {
        if (inputText.length < 1) return

        setText(inputText)
        // setInputText("")
    }

    return (
        <div>
            <h1>{ text }</h1>
            <input
                type="text"
                onChange={(e) => setInputText(e.target.value)}
                value={ text }
                onKeyDown={(e) => e.code === "Enter" && onSubmit()}
            />
        </div>
    )
}