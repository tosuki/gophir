import { Bell, User } from "phosphor-react"

import { createDropdownMenu } from "../menu/dropdown"

import "./styles.css"
import { createNotificationModal } from "../menu/modal/notification"

export function Header() {
    const dropdownMenu = createDropdownMenu([
        { label: "Profile" },
        { label: "Settings" },
        { label: "Exit" }
    ])

    const notificationModal = createNotificationModal()

    return (
        <>
        <div className="header-container">
            <Bell 
                onClick={ notificationModal.toggleModal }
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
        { notificationModal.Modal }
        </>
    )
}
