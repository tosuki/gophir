import { useSession } from "../../hooks/session"

export function ProfilePage() {
    const session = useSession()

    return (
        <h1>{ session.states.passport }</h1>
    )
}