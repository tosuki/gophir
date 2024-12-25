import { createBrowserRouter } from "react-router-dom"

import { AuthenticatePage } from "./pages/authenticate"

const router = createBrowserRouter([
    { path: "/", element: <AuthenticatePage /> }
])

export default router
