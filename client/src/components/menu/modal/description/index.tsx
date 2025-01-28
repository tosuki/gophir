import { useState } from "react"
import { createModal, ToggleModalFunction } from "../prototype"

import { toast } from "react-hot-toast"

import "./styles.css"

export function DescriptionModal({ toggleModal }: {
    toggleModal: ToggleModalFunction
}) {
    const [description, setDescription] = useState<string>("")
    
    const onSubmit = () => {
        toast(description)
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
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
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

export function createDescriptionModal() {
    return createModal({
        Content: DescriptionModal
    })
}
