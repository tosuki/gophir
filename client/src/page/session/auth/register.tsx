import { useNavigate } from "react-router"
import type { SessionContextProperties } from "../../../hooks/session"

import { createSessionPage } from "./prototype"
import { register } from "../../../services/auth"

import { toast } from "react-hot-toast"

export function RegisterPage() {
    const navigate = useNavigate()

    const onSubmit = (
        username: string,
        password: string,
        { setPassport }: SessionContextProperties 
    ) => {
        register(username, password).then((result) => {
            if (!result.error) {
                setPassport(result.data)
                return navigate("/")
            }

            toast.error(result.error.message)
        }).catch((error) => {
            console.log(error)
            toast.error(`Unhandled error occurred, check the console for more information`)
        })
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