import { Header } from "../../../components/header"

import { useSession } from "../../../hooks/session"

import "./styles.css"

export function ProfilePage() {
    const { session } = useSession()

    return (
        <div className="page-container">
            <Header />
            <div className="profile-page-content">
                <div className="left">
                    <h1>Left</h1>
                </div>
                <div className="right">
                    <div className="profile-row">
                        <h1>Username</h1>
                        <p>{ session.data!.username }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
