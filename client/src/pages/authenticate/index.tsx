import { useState } from "react"

import { SubmitButton } from "../../components/buttons/submit"
import { CommonInput } from "../../components/inputs/common"
import { PasswordInput } from "../../components/inputs/password"

import "./styles.css"

export function AuthenticatePage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <h1>Welcome back</h1>
                </div>
                <div className="form-body">
                    <div className="form-inputs">
                        <CommonInput 
                            placeholder="Email"
                            setValue={ setEmail }
                        />
                        <PasswordInput 
                            setValue={ setPassword }
                        />
                    </div>
                    <SubmitButton 
                        placeholder="Continue"
                        onClick={() => window.alert("hello world")}
                    />
                    <p className="problem-message">Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

