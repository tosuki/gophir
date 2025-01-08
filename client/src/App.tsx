import { RouterProvider } from "react-router"

import router from "./router/router"

import "./styles.css"

export function App() {
    return (
        <RouterProvider router={ router } />
    )
}