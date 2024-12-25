import { createBrowserRouter } from "react-router"
import { checkPassport } from "./hooks/session"

import { AuthenticatePage } from "./pages/authenticate"

const router = createBrowserRouter([
    { path: "/", element: checkPassport(AuthenticatePage) }
])

export default router
