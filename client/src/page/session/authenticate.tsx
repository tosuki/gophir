import type { SessionContextProperties } from "../../hooks/session"
import { createSessionPage } from "./prototype"

export function AuthenticatePage() {
    const onSubmit = (
        username: string,
        password: string,
        session: SessionContextProperties 
    ) => {
        console.log(username, password, session)
    }

    return createSessionPage({
        title: "Welcome back",
        footer: {
            message: "Don't have an account?",
            link: {
                label: "Sign Up",
                url: "/register"
            }
        },
        onSubmit,
    })
}