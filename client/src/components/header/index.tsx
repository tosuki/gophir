import { Bell, User } from "phosphor-react"

import { createDropdownMenu } from "../menu/dropdown"

import "./styles.css"

export function Header() {
    const dropdownMenu = createDropdownMenu([
        { label: "Profile" },
        { label: "Settings" },
        { label: "Exit" }
    ])

    return (
        <div className="header-container">
            <Bell 
                color="var(--header-fg)"
                weight="fill"
                size={ 30 }
                className="bell"
            />
            <User
                onClick={ dropdownMenu.toggleMenu }
                color="var(--header-fg)"
                weight="fill"
                size={30}
            />
            { dropdownMenu.Component }
        </div>
    )
}
