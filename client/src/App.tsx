import { RouterProvider } from "react-router"
import { SessionProvider } from "./hooks/session"
import { Toaster } from "react-hot-toast"

import router from "./router/router"

import "./styles.css"

export function App() {
    return (
        <SessionProvider>
            <RouterProvider router={ router } />
            <Toaster 
                position="top-right"
            />
        </SessionProvider>
    )
}