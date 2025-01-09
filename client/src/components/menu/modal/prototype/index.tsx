import { useState, type FC } from "react"

import "./styles.css"

export type ModalProperties = {
    Content: JSX.Element
}

export type ToggleModalFunction = () => unknown

export function Modal({ Content, isOpen, toggleModal }: ModalProperties & {
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

export const createModal = ({ Content }: {
    Content: FC<{ toggleModal: ToggleModalFunction }>
}) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleModal = () => setOpen(!isOpen)

    return {
        toggleModal,
        Modal: <Modal 
            isOpen={ isOpen }
            toggleModal={ toggleModal }
            Content={ <Content toggleModal={ toggleModal }/> }
        />
    }
}
