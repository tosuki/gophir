import {
    createBrowserRouter
} from "react-router"

import { HomePage } from "../page/home"

export default createBrowserRouter([
    { path: "/", element: <HomePage /> },
])