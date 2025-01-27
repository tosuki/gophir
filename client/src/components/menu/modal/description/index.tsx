import { createModal, ToggleModalFunction } from "../prototype"

export function DescriptionModal({ toggleModal }: {
    toggleModal: ToggleModalFunction
}) {
    return (
        <h1>Hello World</h1>
    )
}

export function createDescriptionModal() {
    return createModal({
        Content: DescriptionModal
    })
}
