import { useState, useCallback } from "react"

import { SubmitButton } from "../../components/buttons/submit"
import { CommonInput } from "../../components/inputs/common"
import { PasswordInput } from "../../components/inputs/password"

import { toast } from "react-hot-toast"

import "./styles.css"

import { useSession } from "../../hooks/session"
import { authenticate } from "../../services/session"
import { useNavigate } from "react-router"

export function AuthenticatePage() {
    const session = useSession()
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onSubmitButtonClick = useCallback(() => {
        if (!username || !password) {
            return toast.error("Please fill all the empty fields first")
        }

        authenticate(username, password)
            .then((result) => {
                if (!result.data) {
                    return toast.error("Failed to authenticate, please check the console for more information")
                }

                session.dispatchers.setPassport(result.data)
                navigate("/chat")
            })
            .catch((authenticationError) => {
                switch (authenticationError.error) {
                    case "conflict":
                        return toast.error("Email occupied")
                    case "unauthorized":
                        return toast.error("Wrong credentials")
                    case "not_found":
                        return toast.error("There is a problem with the server, try again later")
                    default:
                        console.log("Error is ", authenticationError)
                }
            })
    }, [username, password])

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <h1>Welcome back</h1>
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
                        onClick={ onSubmitButtonClick }
                    />
                    <p className="problem-message">Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

