import { useState } from "react"
import { useSession } from "../../../../hooks/session"

import { createModal, ToggleModalFunction } from "../prototype"
import { createProfile, setProfile } from "../../../../services/profile"

import { toast } from "react-hot-toast"

import {
    UNHANDLED_ERROR_MESSAGE,
    INVALID_DESCRIPTION_ERROR_INPUT
} from "../../../../lib/error/errors-message"

import "./styles.css"

export type DescriptionModalProperties = {
    toggleProfileModal: ToggleModalFunction
}

export function DescriptionModal({ data, toggleModal }: {
    toggleModal: ToggleModalFunction,
    data?: DescriptionModalProperties 
}) {
    const { session, setPassport } = useSession()
    const [description, setDescription] = useState<string>("")
    
    const onSubmit = async () => {
        if (!description) {
            return toast.error(INVALID_DESCRIPTION_ERROR_INPUT)
        }

        try {
            const result = await setProfile(session.passport, description)
            
            if (result.error) {
                switch(result.error.code) {
                    case "invalid_profile":
                        const createdProfile = await createProfile(session.passport, description)

                        if (createdProfile.error) {
                            console.log(createdProfile.error)
                            return toast.error(UNHANDLED_ERROR_MESSAGE)
                        }
                        break
                    case "invalid_token":
                    case "expired_token":
                        setPassport("")
                        return data!.toggleProfileModal()
                    default:
                        console.log(result.error)
                        return toast.error(UNHANDLED_ERROR_MESSAGE)
                }
            }    
        
            data!.toggleProfileModal()
        } catch (error: any) {
            console.log(error)
            toast.error(UNHANDLED_ERROR_MESSAGE)
            return toggleModal()
        }
    }

    return (
        <div className="description-modal-container">
            <div className="header">
                <h1>Description</h1>
                <button
                    className="close-button" 
                    onClick={ toggleModal }
                />
            </div>
            <div className="input-container">
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={ description }
                    placeholder="Write your description here"
                />
            </div> 
            <div className="buttons-container">
                <button 
                    className="submit-button"
                    onClick={ onSubmit }
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export function createDescriptionModal(data: DescriptionModalProperties) {
    return createModal<DescriptionModalProperties>({
        Content: DescriptionModal,
        data,
    })
}

