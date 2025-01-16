import {
    createBrowserRouter
} from "react-router"
import {
    Private
} from "./private"

import { HomePage } from "../page/home"

import { AuthenticatePage } from "../page/session/auth/authenticate"
import { RegisterPage } from "../page/session/auth/register"
import { ProfilePage } from "../page/session/profile"

export default createBrowserRouter([
    { path: "/", element: <Private><HomePage /></Private> },
    { path: "/profile", element: <Private><ProfilePage /></Private> },
    { path: "/authenticate", element: <AuthenticatePage /> },
    { path: "/register", element: <RegisterPage /> },
])
