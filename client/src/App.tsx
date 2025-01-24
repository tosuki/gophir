import { RouterProvider } from "react-router"

import { SessionProvider } from "./hooks/session"
import { NotificationProvider } from "./hooks/notification"

import { Toaster } from "react-hot-toast"

import router from "./router/router"

import "./styles.css"

export function App() {
    return (
        <SessionProvider>
            <NotificationProvider>
                <RouterProvider router={ router } />
            </NotificationProvider>
            <Toaster 
                position="top-right"
            />
        </SessionProvider>
    )
}
