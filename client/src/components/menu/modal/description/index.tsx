import { useState } from "react"
import { useSession } from "../../../../hooks/session"

import { createModal, ToggleModalFunction } from "../prototype"
import { setProfile } from "../../../../services/profile"

import { toast } from "react-hot-toast"

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
    
    const onSubmit = () => {
        if (!description) {
            return toast.error("Oops! It looks like you forgot to fill in the description. Please take a moment to provide the necessary details before proceeding")
        }


        setProfile(session.passport, description)
        .then((result) => {
            console.log(result)
            if (result.error) {
                switch (result.error.code) {
                    case "conflict":
                        return toast.error("The user already got a profile, you cant add one more!")
                    case "invalid_token":
                    case "expired_token":
                        setPassport("")
                        return toast.error("Your session expired!")
                    default:
                        console.log(result.error)
                        return toast.error(result.error.message)
                }
            }
        
            data!.toggleProfileModal()    
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.message)
            toggleModal()
        })
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

