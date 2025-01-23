import { useState } from "react"
import { Bell, User } from "phosphor-react"

import { useSession } from "../../hooks/session"

import { createDropdownMenu } from "../menu/dropdown"

import { createNotificationModal } from "../menu/modal/notification"
import { createConfirmationModal } from "../menu/modal/confirmation"
import { createProfileModal } from "../menu/modal/profile"

import "./styles.css"

export function Header() {
    const { setPassport } = useSession()
    const [profileUsername, setProfileUsername] = useState<string>("admin")

    const logoutModal = createConfirmationModal({
        message: "Are you sure you want to quit?",
        onConfirm: () => {
            setPassport("")
        },
    })

    const profileModal = createProfileModal(profileUsername)

    const dropdownMenu = createDropdownMenu([
        { label: "Profile", action: () => profileModal.toggleModal()},
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
        { profileModal.Modal }
        </>
    )
}
