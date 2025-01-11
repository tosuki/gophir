import { useState } from "react"

import "./styles.css"

export type TextInputProperties = {
    placeholder: string,
    value: string,
    setValue: (str: string) => unknown
}

export function TextInputComponent({
    setValue, ...properties
}: TextInputProperties) {
    return (
        <input
            type="text"
            className="text-input"
            onChange={(e) => setValue(e.target.value)}
            { ...properties }
        />
    )
}

export function createTextInput(properties: { placeholder: string }): {
    Component: JSX.Element,
    value: string,
    setValue: (newValue: string) => unknown
} {
    const [value, setValue] = useState<string>("")

    return {
        value,
        setValue,
        Component: (
            <TextInputComponent
                placeholder={ properties.placeholder }
                value={ value }
                setValue={ setValue }
            />
        )
    }
}