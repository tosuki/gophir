import "./styles.css"

export type SubmitButtonProperties = {
    placeholder: string
    className?: string
    onClick?: (e: any) => any
}

export function SubmitButton(properties: SubmitButtonProperties) {
    return (
        <button
            className="button"
            onClick={ properties.onClick }
        >
            { properties.placeholder }
        </button>
    )
}
