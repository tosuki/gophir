import { Dispatch, SetStateAction } from "react"

export type CommonInputProperties = {
    placeholder?: string
    setValue: Dispatch<SetStateAction<string>>
}

import "./styles.css"

export function CommonInput({ placeholder, setValue }: CommonInputProperties) {
    return (
        <input
            type="text"
            className="input"
            placeholder={ placeholder || "Type here" }
            onChange={ (e) => setValue(e.target.value) }
        />
    )
}