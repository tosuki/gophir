import { useSession } from "../../../hooks/session"

import { Header } from "../../../components/header"

export function ProfilePage() {
    const { session } = useSession()

    return (
        <div className="page-container">
            <Header />
            <div className="profile-page-content">
                <h1>{ session.data?.username }</h1>
            </div>
        </div>
    )
}
