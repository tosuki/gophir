import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react"

import { User } from "../../api/model/User"

export type SessionContextProperties = {
    states: User
    dispatchers: {
        setUserId: (value: number) => unknown
        setSocketId: (value: string) => unknown
    }
}

export const SessionContext = createContext<SessionContextProperties>({} as SessionContextProperties)

export default function SessionProvider({ children }: { children?: ReactNode }) {
    const [userId, setUserId] = useState<number>(-1)
    const [socketId, setSocketId] = useState<string>("")
    
    return (
        <SessionContext.Provider value={{
            states: { id: userId, socketId: socketId },
            dispatchers: { setUserId, setSocketId }
        }}>
            { children }
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext)
