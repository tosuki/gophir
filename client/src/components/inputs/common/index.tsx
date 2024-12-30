import { Dispatch, SetStateAction } from "react"

export type CommonInputProperties = {
    placeholder?: string
    setValue: Dispatch<SetStateAction<string>>
    onSubmit?: (e: any) => unknown
    value?: string
}

import "./styles.css"

export function CommonInput({ placeholder, setValue, value, onSubmit }: CommonInputProperties) {
    return (
        <input
            type="text"
            className="input"
            value={ value }
            placeholder={ placeholder || "Type here" }
            onChange={ (e) => setValue(e.target.value) }
            onKeyDown={(e) => {
                if (e.key !== "Enter" || !onSubmit) {
                    return
                }
                onSubmit!(e)
            }}
        />
    )
}