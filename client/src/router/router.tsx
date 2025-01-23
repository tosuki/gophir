import {
    createBrowserRouter
} from "react-router"
import {
    Private
} from "./private"

import { HomePage } from "../page/home"

import { AuthenticatePage } from "../page/session/auth/authenticate"
import { RegisterPage } from "../page/session/auth/register"

export default createBrowserRouter([
    { path: "/", element: <Private><HomePage /></Private> },
    { path: "/authenticate", element: <AuthenticatePage /> },
    { path: "/register", element: <RegisterPage /> },
])
