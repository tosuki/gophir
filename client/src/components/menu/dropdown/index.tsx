import { useState } from "react"

import "./styles.css"

export type DropdownMenuItem = {
    label: string
    action?: () => unknown
}

function DropdownMenu({ isOpen, items }: { isOpen: boolean, items: DropdownMenuItem[] }) {
    return (
        <>
            { isOpen && (
                <div className="dropdown-menu-container">
                    <ul>
                        {items.map((item) => {
                            return (
                                <li onClick={ item.action }>{ item.label }</li>
                            )
                        })}
                    </ul>
                </div>
            ) }
        </>
    )
}

export function useDropdownMenu(properties: { items: DropdownMenuItem[] }) {
    const [isOpen, setOpen] = useState<boolean>(false)

    return {
        toggleMenu: () => setOpen(!isOpen),
        Component: <DropdownMenu { ...properties } isOpen={ isOpen }/>
    }
}