import { useState } from "react"
import { createCheckbox } from "../checkbox"

import { Eye, EyeSlash } from "phosphor-react"

import "./styles.css"

export function PasswordInputComponent({ setValue, ...properties }: {
    value: string,
    placeholder: string,
    setValue: (newValue: string) => unknown
}) {
    const checkbox = createCheckbox({
        unchecked: <Eye size={22}/>,
        checked: <EyeSlash size={22}/>
    })

    return (
        <div className="password-input-container">
            <input 
                type={ checkbox.isChecked ? "text" : "password" } 
                className="password-input"
                onChange={(e) => setValue(e.target.value)}
                { ...properties }
            />
            <div className="password-input-hide-checkbox">
                { checkbox.Input }
            </div>
        </div>
    )
}

export function createPasswordInput({ placeholder }: {
    placeholder: string
}): {
    Input: JSX.Element,
    value: string
} {
    const [value, setValue] = useState<string>("")

    return {
        Input: (
            <PasswordInputComponent
                placeholder={ placeholder }
                value={ value }
                setValue={ setValue }
            />
        ),
        value,
    }
}