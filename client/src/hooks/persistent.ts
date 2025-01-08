import { Cookies } from "react-cookie"
import {
    Dispatch,
    SetStateAction,

    useState,
    useEffect
} from "react"

export type PersistentState <T> = [
    T,
    Dispatch<SetStateAction<T>>
]

export function usePersistentState<T>(cookiesKey: string, defaultValue: T): PersistentState<T> {
    const cookies = new Cookies()
    const [state, setState] = useState<T>(() => {
        const value = cookies.get(cookiesKey)

        return value ? JSON.parse(value) : defaultValue
    })

    useEffect(() => {
        cookies.set(cookiesKey, state)
    }, [state])

    return [state, setState]
}