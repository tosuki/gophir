import { useState, useEffect } from "react"
import { useSession } from "../../../../hooks/session"

import { getProfile } from "../../../../services/profile"
import { createModal, ToggleModalFunction } from "../prototype"
import { toast } from "react-hot-toast"

import { Profile } from "../../../../model/profile"

import { Pen } from "phosphor-react"

import "./styles.css"

export type ProfileModalProperties = {
    username: string,
}

export function ProfileInfoWindow(properties: {
    label: string,
    info: string
}) {
    return (
        <div className="profile-info-container">
            <div className="profile-info-header">
                <h1>{ properties.label }</h1>
            </div>
            <div className="profile-info-body">
                { properties.info }
            </div>
        </div>
    )
}

export function ProfileModal({ toggleModal, data }: {
    toggleModal: ToggleModalFunction,
    data: ProfileModalProperties
}) {
    const { session, setPassport } = useSession()
    const [profile, setProfile] = useState<Profile | null>()

    useEffect(() => {
        getProfile(data.username)
        .then((result) => {
            if (result.error) {
                switch (result.error.code) {
                    case "invalid_profile":
                        return setProfile({
                            description: "There should be something here",
                            author: {
                                id: session.data!.id,
                                username: session.data!.username,
                                createdAt: session.data!.createdAt
                            }
                        })
                    default:
                        console.log(result.error)
                        return toast.error(result.error.message)
                }
            }
            
            setProfile(result.data)
        })
        .catch((error) => {
            toggleModal()
            console.log(error)
        })
    }, [data.username])
    
    const onEditButtonClick = () => {
        toast("Work in progress")
    }

    return (
        <div className="profile-modal-container">
            <div className="header">
                <h1>Profile</h1>
                <button 
                    onClick={ toggleModal }
                    className="close-button"
                />
            </div>
            <div className="body">
                <div className="left">
                    <div className="profile-picture-container" />
                    <ProfileInfoWindow 
                        label="Username"
                        info="admin#001"
                    />
                    <ProfileInfoWindow 
                        label="Created At"
                        info={ new Date().toLocaleString() }
                    />
                </div>
                <div className="right">
                    <div className="profile-description-container">
                        <div className="profile-description-header">
                            <h1>Description</h1>
                            <button className="edit-button" onClick={ onEditButtonClick }>
                                <Pen 
                                    size={30}
                                    weight="fill"
                                    color="var(--header-fg)"
                                />
                            </button>
                        </div>
                        <div className="profile-description-body">
                            { profile ? profile.description : "Loading!!" }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function createProfileModal(username: string) {
    return createModal({
        Content: ProfileModal,
        data: { username }
    })
}
