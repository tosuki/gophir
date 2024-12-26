import { ReactNode, createContext, useContext } from "react"
import { usePersistentState } from "../util/persistentState"

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

export function checkPassport(Element: (properties?: any) => ReactNode, ...properties: any[]): ReactNode {
    const session = useSession()

    if (!session.states.passport) {
        return <h1>Unauthorized</h1>
    }

    return <Element { ...properties }/>
}

export function useSession() {
    return useContext(SessionContext)
}
