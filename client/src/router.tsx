import { createBrowserRouter } from "react-router"

import { AuthenticatePage } from "./pages/authenticate"

const router = createBrowserRouter([
    { path: "/", element: <AuthenticatePage /> }
])

export default router
