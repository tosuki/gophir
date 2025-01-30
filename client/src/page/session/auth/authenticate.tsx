import type { SessionContextProperties } from "../../../hooks/session"

import { createSessionPage } from "./prototype"
import { authenticate } from "../../../services/auth"
import { toast } from "react-hot-toast"

import { useNavigate } from "react-router"

import {
    INVALID_PASSWORD_AUTH_ERROR_MESSAGE,
    INVALID_USERNAME_AUTH_ERROR_MESSAGE,
    UNHANDLED_ERROR_MESSAGE
} from "../../../lib/error/errors-message"

export function AuthenticatePage() {
    const navigate = useNavigate()

    const onSubmit = (
        username: string,
        password: string,
        { setPassport }: SessionContextProperties 
    ) => {
        authenticate(username, password)
            .then((result) => {
                if (result.error) {
                    switch (result.error.code) {
                        case "invalid_password":
                            return toast.error(INVALID_PASSWORD_AUTH_ERROR_MESSAGE)
                        case "invalid_username":
                            return toast.error(INVALID_USERNAME_AUTH_ERROR_MESSAGE)
                    }

                    console.log(result.error.cause)
                    return toast.error(result.error.message)
                }

                setPassport(result.data)
                navigate("/")
            }).catch((error) => {
                console.log(error)
                toast.error(UNHANDLED_ERROR_MESSAGE)
            })
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
