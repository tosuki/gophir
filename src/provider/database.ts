import * as knex from "knex"
import { logger } from "../logger"

export class KnexLogger {
    static error(err: any) {
        logger.error(`[DB] ${err}`)
    }

    static warn(warn: any) {
        logger.warn(warn)
    }
}

export function createDatabase(connection: string): knex.Knex {
    const queryBuilder = knex({
        client: "pg",
        connection,
        log: KnexLogger
    })

   return queryBuilder
}
