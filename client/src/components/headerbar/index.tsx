import { useSession } from "../../hooks/session"
import { useDropdownMenu } from "../menu/dropdown"

import "./styles.css"

export function Headerbar() {
    const session = useSession()

    const dropdownMenu = useDropdownMenu({ items: [
        {label: "Logout", action: () => {
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