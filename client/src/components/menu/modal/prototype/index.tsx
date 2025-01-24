import { useState, type FC } from "react"

import "./styles.css"

export type ModalProperties = {
    Content: JSX.Element
}

export type ToggleModalFunction = () => unknown

export function Modal({ Content, isOpen }: ModalProperties & {
    isOpen: boolean,
    toggleModal: ToggleModalFunction
}) {
    return (
        <>{ isOpen && (
            <div className="modal-container" >
                { Content }
            </div>
        )}</>
    )
}

export function createModal<T extends Record<any, any>>(properties: {
    Content: FC<{ toggleModal: ToggleModalFunction, data?: T }>,
    data?: T
}) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const toggleModal = () => setOpen(!isOpen)

    return {
        toggleModal,
        Modal: <Modal 
            isOpen={ isOpen }
            toggleModal={ toggleModal }
            Content={(
                <properties.Content 
                    toggleModal={ toggleModal }
                    data={ properties.data }
                />
            )}
        />
    }
}
