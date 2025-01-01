import { useState } from "react"

import "./styles.css"

export type ModalMenuProperties = {
    component: JSX.Element
}

export function ModalMenu({ component, isOpen }: ModalMenuProperties & { isOpen: boolean }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-menu-container">
            { component }
        </div>
    )
}

export function useModalMenu(properties: ModalMenuProperties) {
    const [isOpen, setOpen] = useState<boolean>(false)

    return {
        toggle: () => setOpen(!isOpen),
        Component: <ModalMenu isOpen={ isOpen } { ...properties }/>
    }
}