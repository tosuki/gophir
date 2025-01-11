import {
    createBrowserRouter
} from "react-router"

import { HomePage } from "../page/home"
import { AuthenticatePage } from "../page/session/authenticate"

export default createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/authenticte", element: <AuthenticatePage /> }
])