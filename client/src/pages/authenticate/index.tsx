import { useState } from "react"

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
                        <input
                            type="text"
                            placeholder="Email adress"
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            className="form-input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="continue-button">Continue</button>
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

