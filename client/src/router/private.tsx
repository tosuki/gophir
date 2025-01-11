import { ReactNode } from "react"
import { Navigate } from "react-router"
import { useSession } from "../hooks/session"

export function Private({ children }: {
    children: ReactNode,
}) {
    const { session } = useSession()

    if (!session.passport || session.passport.length < 1) {
        return <Navigate to="/authenticate"/>
    }

    return children
}
