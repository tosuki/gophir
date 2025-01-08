import { isAxiosError, AxiosError } from "axios";

export function isNetworkError(error: AxiosError): boolean {
    return !!(error.response && error.response.status)
}

export function isCriticalError(error: any): error is AxiosError & { response: { data: NonNullable<any> }} {
    return !(
        isAxiosError(error) &&
        isNetworkError(error) &&
        error.response?.data
    )
}
