import { Cookies, useCookies } from "react-cookie"
import {
    useContext,
    createContext,
    type ReactNode,
} from "react"

import { Session } from "../model/session"

export type SessionContextProperties = {
    session: {
        passport: string,
        data: Session,
    },
    setPassport: (passport: string) => unknown
}

const SessionContext = createContext<SessionContextProperties>({} as SessionContextProperties)
export function SessionProvider({ children: ReactNode }) {
    const cookies = new Cookies()
    const passport = cookies.get("AUTH_PASSPORT")

}
