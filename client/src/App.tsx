import { ToastContainer } from "react-toastify"

import "./styles/global.css"
import 'react-toastify/dist/ReactToastify.css';

import ChatComponent from "./components/chat";

function App() {
    return (
        <>
            <ChatComponent />
            <ToastContainer />
        </>
    )
}

export default App
