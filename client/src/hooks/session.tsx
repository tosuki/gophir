import { usePersistentState } from "./persistent"
import {
    useContext,
    createContext,
    useEffect,
    ReactNode,
    useState
} from "react"

import { Session } from "../model/session"
import { getSession } from "../services/auth"

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
    const [session, setSession] = useState<Session | undefined>({
        id: 2,
        createdAt: new Date(),
        expiresAt: 0,
        issuedAt: 0,
        username: "admin",
    })    

    useEffect(() => {
        if (passport) {
            getSession(passport).then((result) => {
                if (result.error) {
                    return console.log("Failed to get the session data due to ", result.error)
                }
                
                setSession(result.data)
            }).catch((error) => {
                console.log("Failed to get the session data due to: ", error)
            })
        }
    }, [passport])

    return (
        <SessionContext.Provider value={{
            session: {
                passport,
                data: session
            },
            setPassport
        }}>
            { properties.children }
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext)
