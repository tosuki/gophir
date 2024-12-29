import { createBrowserRouter } from "react-router"

import { AuthenticatePage } from "./pages/session/authenticate"
import { RegisterPage } from "./pages/session/register"
import { ChatPage } from "./pages/chat"

import { Route } from "./hooks/session"

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthenticatePage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    { 
        path: "chat",
        element: (
            <Route isPrivate={ true }>
                <ChatPage />
            </Route>
        )
    },
])

export default router
