import { RouterProvider } from "react-router"
import { SessionProvider } from "./hooks/session"
import { ToastProvider } from "./hooks/toastify"

import router from "./router"

import "./styles/global.css"

export function App() {
  return (
    <>
      <SessionProvider>
        <RouterProvider router={ router }/>
      </SessionProvider>
      <ToastProvider />
    </>
  )
}
