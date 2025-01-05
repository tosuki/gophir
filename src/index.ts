import "make-promises-safe"
import environment from "./env"

import { logger } from "./logger"

import { createDatabase } from "./provider/database"
import {
    createUserRepository
} from "./factory/repository"
import { isCriticalError } from "./library/error/CriticalError"

const queryBuilder = createDatabase()
const userRepository = createUserRepository(queryBuilder)

async function main() {
    const user = await userRepository.save("tosuki@3", "123")

    console.log(user)
}

main()
    .catch((error) => {
        if (isCriticalError(error)) {
            return logger.error(`Critical error: `, error.cause)
        }

        console.log(error)
    })