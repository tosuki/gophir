import { useState } from "react"

import "./styles.css"

export type DropdownMenuItem = {
    label: string,
    icon?: any
    action?: () => unknown
}

export function DropdownMenu({ items, isOpen, toggleMenu }: {
    isOpen: boolean,
    items: DropdownMenuItem[],
    toggleMenu: () => unknown
}) {
    return (
        <>{ isOpen && (
            <div className="dropdown-menu-container">
                <ul>{ items.map((item, index) => {
                    return (
                        <li key={ index } onClick={() => {
                            item.action()
                            toggleMenu()
                        }}>{ item.label }</li>
                    )
                }) }</ul>
            </div>
        )}</>
    )
}

export function createDropdownMenu(items: DropdownMenuItem[]) {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleMenu = () => setOpen(!isOpen)

    return {
        toggleMenu,
        Component: <DropdownMenu 
            isOpen={ isOpen }
            items={ items }
            toggleMenu={ toggleMenu }
        />
    }
}
