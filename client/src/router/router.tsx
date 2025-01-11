import {
    createBrowserRouter
} from "react-router"

import { HomePage } from "../page/home"
import { AuthenticatePage } from "../page/session/authenticate"
import { RegisterPage } from "../page/session/register"

export default createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/authenticte", element: <AuthenticatePage /> },
    { path: "/register", element: <RegisterPage /> }
])