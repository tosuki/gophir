import type { SessionContextProperties } from "../../hooks/session"
import { createSessionPage } from "./prototype"

export function RegisterPage() {
    const onSubmit = (
        username: string,
        password: string,
        session: SessionContextProperties 
    ) => {
        console.log(username, password, session)
    }

    return createSessionPage({
        title: "Create an account",
        footer: {
            link: {
                label: "Login",
                url: "/authenticate"
            },
            message: "Already have an account?"
        },
        onSubmit,
    })
}