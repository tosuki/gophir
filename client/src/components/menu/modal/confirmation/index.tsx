import { createModal, ToggleModalFunction } from "../prototype"

import "./styles.css"

export type ConfirmationModalProperties = {
    message: string
    onConfirm: () => unknown
    onRefuse?: () => unknown
}

export function ConfirmationModal({ data, toggleModal }: {
    toggleModal: ToggleModalFunction,
    data?: ConfirmationModalProperties
}) {
    return (
        <div className="confirmation-modal-container">
            <div className="header">
                <h1>{ data?.message }</h1>
            </div>
            <div className="buttons">
                <button
                    className="confirm-button"
                    onClick={ () => {
                        toggleModal()
                        data?.onConfirm && data.onConfirm()
                    }}
                >Yes</button>
                <button
                    className="refuse-button"
                    onClick={ () => {
                        toggleModal()
                        data?.onRefuse && data.onRefuse()
                    }}
                >No</button>
            </div>
        </div>
    )
}

export function createConfirmationModal(properties: ConfirmationModalProperties) {
    return createModal<ConfirmationModalProperties>({
        Content: ConfirmationModal,
        data: properties
    })
}