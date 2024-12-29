import { toast } from "react-hot-toast"

import { SessionPagePrototype } from "./prototype";

export function RegisterPage() {
    const onSubmit = (username: string, password: string) => {
        toast(`Username: ${username} Password: ${password}`)
    }

    return (
        <SessionPagePrototype 
            onSubmit={ onSubmit }
            formTitle="Create an account"
            footerMessage={<>Already have an account? <a href="/">Sign In</a></>}
        />
    )
}
