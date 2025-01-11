import { usePersistentState } from "./persistent"
import {
    useContext,
    createContext,
    ReactNode,
} from "react"

import { Session } from "../model/session"

export type SessionContextProperties = {
    session: {
        passport: string,
        data?: Session,
    },
    setPassport: (passport: string) => unknown
}

const SessionContext = createContext<SessionContextProperties>({} as SessionContextProperties)

export function SessionProvider(properties: {
    children: ReactNode
}) {
    const [passport, setPassport] = usePersistentState<string>("SESSION_PASSPORT", "")

    return (
        <SessionContext.Provider value={{
            session: {
                passport,
            },
            setPassport
        }}>
            { properties.children }
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext)
