import { useState } from "react"

import "./styles.css"

export type DropdownMenuItem = {
    label: string,
    icon?: any
    action?: () => unknown
}

export function DropdownMenu({ items, isOpen }: {
    isOpen: boolean,
    items: DropdownMenuItem[]
}) {
    return (
        <>{ isOpen && (
            <div className="dropdown-menu-container">
                <ul>{ items.map((item) => {
                    return (
                        <li onClick={item.action}>{ item.label }</li>
                    )
                }) }</ul>
            </div>
        )}</>
    )
}

export function createDropdownMenu(items: DropdownMenuItem[]) {
    const [isOpen, setOpen] = useState<boolean>(false)

    return {
        toggleMenu: () => setOpen(!isOpen),
        Component: <DropdownMenu 
            isOpen={ isOpen }
            items={ items }
        />
    }
}
