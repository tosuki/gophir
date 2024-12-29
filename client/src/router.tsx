import { createBrowserRouter } from "react-router"

import { AuthenticatePage } from "./pages/authenticate"
import { ChatPage } from "./pages/chat"

import { Route } from "./hooks/session"

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthenticatePage />
    },
    { 
        path: "chat",
        element: (
            <Route isPrivate={ true }>
                <ChatPage />
            </Route>
        )
    }
])

export default router
