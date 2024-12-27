import axios from "axios"

export default axios.create({
    baseURL: import.meta.env.AUTH_SERVICE_URL,
})
