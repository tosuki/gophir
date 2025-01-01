import {
    useState,
    useCallback,
    useEffect,
    ReactNode
} from "react"
import {
    SessionContextType,
    useSession
} from "../../../hooks/session"
import { useNavigate } from "react-router"

import { CommonInput } from "../../../components/inputs/common"
import { SubmitButton } from "../../../components/buttons/submit"
import { PasswordInput } from "../../../components/inputs/password"

import "./styles.css"

// export type RedirectFunction = (to: string) => unknown

export type SessionPrototypeProperties = {
    onSubmit: (
        username: string,
        password: string,
        session: SessionContextType
    ) => any,
    footerMessage?: ReactNode
    formTitle?: string
}

export function SessionPagePrototype(properties: SessionPrototypeProperties) {
    const session = useSession()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    
    useEffect(() => {
        if (session.states.passport) {
            navigate("/chat")
        }
    }, [session.states.passport])

    const onSubmit = useCallback(() => {
        properties.onSubmit(username, password, session)
    }, [username, password])

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <h1>{properties.formTitle || "Welcome back"}</h1>
                </div>
                <div className="form-body">
                    <div className="form-inputs">
                        <CommonInput 
                            placeholder="Username"
                            setValue={ setUsername }
                        />
                        <PasswordInput 
                            setValue={ setPassword }
                        />
                    </div>
                    <SubmitButton 
                        placeholder="Continue"
                        onClick={ onSubmit }
                    />
                    <p className="problem-message">
                        {
                            properties.footerMessage ?
                            properties.footerMessage :
                            <>Don't have an account? <a href="/register">Sign Up</a></>
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}