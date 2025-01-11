import { createTextInput } from "../../../components/inputs/text"
import type { SessionContextProperties } from "../../../hooks/session"

import "./styles.css"

export type SessionPrototypeFooterLink = {
    label: string,
    url: string
}

export type SessionPrototypeFooterProperties = {
    message: string,
    link: SessionPrototypeFooterLink
}

export type SessionPrototypeProperties = {
    title: string,
    onSubmit?: (
        username: string,
        password: string,
        session: SessionContextProperties,
    ) => unknown
    footer?: SessionPrototypeFooterProperties
}

export function SessionPrototypePage({ title, footer }: SessionPrototypeProperties) {
    const usernameInput = createTextInput({ placeholder: "Username" })
    const passwordInput = createTextInput({ placeholder: "Password" })
    
    return (
        <div className="page-container">
            <div className="session-content">
                <div className="form-container">
                    <div className="form-header">
                        <h1>{ title }</h1>
                    </div>
                    <div className="form-body">
                        <div className="form-inputs">
                            { usernameInput.Component }
                            { passwordInput.Component }
                        </div>
                        <div className="form-buttons">
                            <button 
                                className="submit-button"
                                onClick={() => window.alert("hello world")}
                            >
                                Submit
                            </button>
                        </div>
                        { footer && (
                            <div className="form-footer">
                                { footer.message } <a href={ footer.link.url }>{ footer.link.label }</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function createSessionPage(properties: SessionPrototypeProperties): JSX.Element {
    return (
        <SessionPrototypePage 
            { ...properties }
        />
    )
}