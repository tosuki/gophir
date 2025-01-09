import { Bell, User } from "phosphor-react"

import { createDropdownMenu } from "../menu/dropdown"

import "./styles.css"
import { createNotificationModal } from "../menu/modal/notification"
import { createConfirmationModal } from "../menu/modal/confirmation"

export function Header() {
    const logoutModal = createConfirmationModal({
        message: "Are you sure you want to quit?",
        onConfirm: () => {
            console.log("saindo")
        },
        onRefuse: () => {
            console.log("tranquilo")
        }
    })

    const dropdownMenu = createDropdownMenu([
        { label: "Exit", action: logoutModal.toggleModal }
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
        { logoutModal.Modal }
        { notificationModal.Modal }
        </>
    )
}
