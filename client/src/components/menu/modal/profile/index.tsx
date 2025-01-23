import { useState, useEffect } from "react"

import { getProfile } from "../../../../services/profile"
import { createModal, ToggleModalFunction } from "../prototype"
import { toast } from "react-hot-toast"

import { Profile } from "../../../../model/profile"

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
    const [profile, setProfile] = useState<Profile>()

    useEffect(() => {
        getProfile(data.username)
        .then((result) => {
            if (result.error) {
                console.log(result.error)
                toggleModal()
                return toast.error(result.error.message)
            }
            
            setProfile(result.data)
        })
        .catch((error) => {
            toggleModal()
            console.log(result)
        })
    }, [data.username])

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
                        </div>
                        <div className="profile-description-body">
                            Hello World 
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
