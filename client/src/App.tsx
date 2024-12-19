import { ToastContainer } from "react-toastify"

import "./styles/global.css"
import 'react-toastify/dist/ReactToastify.css';

import ChatComponent from "./components/chat";
import SessionProvider from "./hooks/session";

function App() {
    return (
        <>
            <SessionProvider>
                <ChatComponent />
            </SessionProvider>
            <ToastContainer />
        </>
    )
}

export default App
