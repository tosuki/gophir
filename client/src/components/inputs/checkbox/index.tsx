import { useState, ReactNode } from "react"

import "./styles.css"

export type CheckboxProperties = {
    checked?: ReactNode
    unchecked?: ReactNode
}

export function CheckboxComponent({ isChecked, check, ...properties }: CheckboxProperties & {
    isChecked: boolean,
    check: () => unknown
}) {
    return (
        <div className="checkbox-container" onClick={ check }>
            { isChecked ? properties.checked : properties.unchecked }
        </div>
    )
}

export function createCheckbox(properties: CheckboxProperties): {
    Input: JSX.Element,
    isChecked: boolean
} {
    const [isChecked, setChecked] = useState<boolean>(false)

    return {
        isChecked,
        Input: (
            <CheckboxComponent 
                isChecked={ isChecked }
                check={() => setChecked(!isChecked)}
                { ...properties }
            />
        )
    }
}