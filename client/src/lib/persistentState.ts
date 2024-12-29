import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction
} from "react"

export type PersistentState <T> = [T, Dispatch<SetStateAction<T>>]

export function usePersistentState<T>(key: string, data?: T): PersistentState<T> {
    const [state, setState] = useState<T>(() => {
        const item = window.localStorage.getItem(key)

        if (item) {
            return JSON.parse(item)
        }

        return data
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))        
    }, [state])

    return [state, setState]
}
