import { ReactNode, createContext, useContext, useEffect } from "react"
import { usePersistentState } from "../lib/persistentState"
import { useNavigate } from "react-router"

export type SessionContextType = {
    states: {
        passport: string
    },
    dispatchers: {
        setPassport: (passport: string) => unknown
    }
}
export const SessionContext = createContext<SessionContextType>({} as SessionContextType)

export function SessionProvider(properties: {
    children: ReactNode
}) {
    const [passport, setPassport] = usePersistentState<string>("AUTH_PASSPORT", "")

    return (
        <SessionContext.Provider value={{
            states: { passport },
            dispatchers: { setPassport }
        }}>
            { properties.children }
        </SessionContext.Provider>
    )
}

export type RouteProperties = {
    children: ReactNode
    isPrivate?: boolean
}

export function Route({ children, isPrivate }: RouteProperties) {
    const session = useSession()
    const navigate = useNavigate()

    useEffect(() => {
        if (isPrivate && session.states.passport.length <= 0) {
            navigate("/")
        }
    }, [session.states.passport])


    return children
}

export function useSession() {
    return useContext(SessionContext)
}
