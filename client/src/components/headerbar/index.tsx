import { useSession } from "../../hooks/session"

import { useDropdownMenu } from "../menu/dropdown"
import { useModalMenu } from "../menu/modal"

import "./styles.css"

export function Headerbar() {
    const session = useSession()

    const settingsModal = useModalMenu({
        component: <h1>Hello World</h1>
    })

    const dropdownMenu = useDropdownMenu({ items: [
        { label: "Settings", action: settingsModal.toggle },
        { label: "Logout", action: () => {
            session.dispatchers.setPassport("")
        }}
    ]})

    return (
        <div className="headerbar-container">
            <div className="right">
                <div className="profile-button" 
                    onClick={ dropdownMenu.toggleMenu }
                />
                {dropdownMenu.Component}
            </div>
        </div>
    )
}