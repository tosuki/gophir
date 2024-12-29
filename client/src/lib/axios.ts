import { AxiosError, HttpStatusCode } from "axios"
import { Result } from "./result"

export function isNetworkError(error: AxiosError): boolean {
    if (error.response && error.response.status) {
        return false
    }

    return true
}

export const statusErrorMap: Record<number, string> = {
    [HttpStatusCode.NotFound]: "not_found",
    [HttpStatusCode.InternalServerError]: "internal_server_error",
    [HttpStatusCode.BadRequest]: "bad_request",
    [HttpStatusCode.Unauthorized]: "unauthorized",
    [HttpStatusCode.Conflict]: "conflict",
}

export function parseResponseStatusError(status?: number): Result<never> {
    return {
        error: status ? statusErrorMap[status] : "unhandled"
    }
}