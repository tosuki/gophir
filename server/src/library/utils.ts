import type { CriticalError } from "./error/CriticalError";

import { logger } from "./logger"

export function handleCriticalError(criticalError: CriticalError) {
    switch (criticalError.code) {
        case "database_error":
            logger.error(`[Database Error] ${criticalError.message}`, criticalError.cause)
            break
        case "encrypt_error":
            logger.error(`[Encrypt error] Error during the encryption process`, criticalError.cause)
            break
        default:
            logger.error(`[Unhandled] An unhandled error during the authentication process`, criticalError.cause)
            break
        }
}