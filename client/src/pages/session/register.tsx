import { toast } from "react-hot-toast"
import { register } from "../../services/session"

import { SessionPagePrototype } from "./prototype";
import { SessionContextType } from "../../hooks/session";

export function RegisterPage() {
    const onSubmit = (username: string, password: string, session: SessionContextType) => {
        if (!username || !password) {
            return toast.error("Please fill all the inputs first")
        }

        register(username, password)
            .then((result) => {
                if (!result.data) {
                    console.log("Unhandled result of register function", result)
                    return toast.error("Failed to authenticate, please check the console for more information")
                }

                session.dispatchers.setPassport(result.data)
            })
            .catch((registrationError) => {
                switch (registrationError.error) {
                    case "conflict":
                        return toast.error("That email has already been")
                    case "unauthorized":
                        return toast.error("Incorrect username or password")
                    case "not_found":
                        return toast.error("There is a problem with the server, try again later")
                    default:
                        toast.error(`An error occured, try again later (check the console for more information)`)
                        console.log("Error is ", registrationError)
                }
            })
    }

    return (
        <SessionPagePrototype 
            onSubmit={ onSubmit }
            formTitle="Create an account"
            footerMessage={<>Already have an account? <a href="/">Sign In</a></>}
        />
    )
}
