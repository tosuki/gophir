import {
    useState,
    createContext,
    useContext,
    ReactNode,
} from "react"

import { toast } from "react-hot-toast"

import { createProfileModal } from "../components/menu/modal/profile"

export type ProfileModalContextProperties = {
    toggle: (username: string) => unknown
}

export const ProfileModalContext = createContext<ProfileModalContextProperties>({} as any)

export function ProfileModalProvider(properties: {
    children?: ReactNode
}) {
    const [username, setUsername] = useState<string>("")

    const profileModal = createProfileModal(username)

    const toggle = (profileUsername: string): unknown => {
        if (profileUsername === username) {
            return profileModal.toggleModal()
        }
        
        setUsername(profileUsername)
        profileModal.toggleModal()
    }

    return (
        <ProfileModalContext.Provider value={{
            toggle,
        }}>
            { profileModal.Modal }
            { properties.children }
        </ProfileModalContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileModalContext)
