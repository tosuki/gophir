import * as knex from "knex"

export function createDatabase(connection: string): knex.Knex {
    return knex({
        client: "pg",
        connection,
    })
}
