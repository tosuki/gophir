import { useState } from "react"
import { Bell, User } from "phosphor-react"

import { useSession } from "../../hooks/session"
import { useProfile } from "../../hooks/profile"

import { createDropdownMenu } from "../menu/dropdown"

import { createNotificationModal } from "../menu/modal/notification"
import { createConfirmationModal } from "../menu/modal/confirmation"
import { createProfileModal } from "../menu/modal/profile"

import "./styles.css"

export function Header() {
    const { setPassport, session } = useSession()
    const profile = useProfile()

    const logoutModal = createConfirmationModal({
        message: "Are you sure you want to quit?",
        onConfirm: () => {
            setPassport("")
        },
    })

    const dropdownMenu = createDropdownMenu([
        { label: "Profile", action: () => profile.toggle(session.data!.username)},
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
