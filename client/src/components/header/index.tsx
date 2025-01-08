import { User } from "phosphor-react"

import "./styles.css"

export function Header() {
    return (
        <div className="header-container">
            <User color="var(--header-fg)" weight="fill" size={26}/>
        </div>
    )
}
