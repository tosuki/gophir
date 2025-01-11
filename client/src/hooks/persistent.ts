import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction
} from "react"

export type PersistentState <T> = [
    T,
    Dispatch<SetStateAction<T>>
]

export function usePersistentState<T>(key: string, value: T): PersistentState<T> {
    const [state, setState] = useState<T>(() => {
        const item = localStorage.getItem(key)

        return item ? JSON.parse(item) : value
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state])

    return [state, setState]
}
