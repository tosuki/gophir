import axios from "axios"

const server = axios.create({
    // baseURL: import.meta.env.VITE_SERVER_BASE_URL
    baseURL: "http://0.0.0.0:3000"
})

export { server }
