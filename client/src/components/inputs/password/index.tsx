import { useState, Dispatch, SetStateAction } from "react"

import Eye from "../../../assets/eye.svg?react"
import EyeOff from "../../../assets/eye-off.svg?react"

import { Checkbox } from "../checkbox"

import "./styles.css"

export type PasswordInputProperties = {
    placeholder?: string
    setValue: Dispatch<SetStateAction<string>>
}

export function PasswordInput({ setValue, placeholder }: PasswordInputProperties) {
    const [isVisible, setVisibility] = useState<boolean>(false)

    return (
        <div className="password-input-container">
            <input
                className="text-input"
                type={isVisible ? "text" : "password"} 
                placeholder={ placeholder || "Password" }
                onChange={ (e) => setValue(e.target.value) }
            />
            <Checkbox 
                isChecked={ isVisible }
                setChecked={ setVisibility }
                icons={{
                    checked: <Eye />,
                    unchecked: <EyeOff />
                }}
            />
        </div>
    )
}