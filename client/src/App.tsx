import { RouterProvider } from "react-router"
import { SessionProvider } from "./hooks/session"

import router from "./router/router"

import "./styles.css"

export function App() {
    return (
        <SessionProvider>
            <RouterProvider router={ router } />
        </SessionProvider>
    )
}