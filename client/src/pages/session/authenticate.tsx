import { SessionContextType } from "../../hooks/session"

import { toast } from "react-hot-toast"
import { authenticate } from "../../services/session"

import { SessionPagePrototype } from "./prototype"

export function AuthenticatePage() {
    const onSubmit = (username: string, password: string, session: SessionContextType) => {
        if (!username || !password) {
            return toast.error("Please fill all the empty fields first")
        }

        authenticate(username, password)
            .then((result) => {
                if (!result.data) {
                    return toast.error("Failed to authenticate, please check the console for more information")
                }

                session.dispatchers.setPassport(result.data)
            })
            .catch((authenticationError) => {
                switch (authenticationError.error) {
                    case "conflict":
                        return toast.error("That email has already been")
                    case "unauthorized":
                        return toast.error("Incorrect username or password")
                    case "not_found":
                        return toast.error("There is a problem with the server, try again later")
                    default:
                        toast.error(`An error occured, try again later (check the console for more information)`)
                        console.log("Error is ", authenticationError)
                }
            })
    }

    return (
        <SessionPagePrototype 
            onSubmit={ onSubmit }
        />
    )
}

