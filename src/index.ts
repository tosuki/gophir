import "make-promises-safe"
import environment from "./env"

import { logger } from "./logger"
import { createDatabase } from "./provider/database"

async function main() {
}

main()
    .then((any) => {
        console.log(any)
    })
    .catch((error) => {
        console.log(error)
    })
