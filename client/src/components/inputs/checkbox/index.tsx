import { Dispatch, ReactNode, SetStateAction } from "react"

import "./styles.css"

export type CheckboxProperties = {
    isChecked: boolean
    setChecked: Dispatch<SetStateAction<boolean>>
    icons: {
        checked: ReactNode,
        unchecked: ReactNode
    }
}

export function Checkbox({
    isChecked,
    setChecked,
    icons
}: CheckboxProperties) {
    const onCheckboxClick = () => {
        setChecked(!isChecked)
    }
    
    return (
        <div className="checkbox-container" onClick={ onCheckboxClick }>
            { isChecked ? icons.checked : icons.unchecked }
        </div>
    )
}
