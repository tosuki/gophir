import type { SessionContextProperties } from "../../../hooks/session"

import { createSessionPage } from "./prototype"
import { authenticate } from "../../../services/auth"
import { toast } from "react-hot-toast"

import { useNavigate } from "react-router"

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
                            return toast.error("Invalid password")
                        case "invalid_username":
                            return toast.error("Invalid username")
                    }

                    console.log(result.error.cause)
                    return toast.error(result.error.message)
                }

                setPassport(result.data)
                navigate("/")
            }).catch((error) => {
                console.log(error)
                toast.error(`Failed to authenticate due to ${error.code || error.message}`)
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